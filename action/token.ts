"use server";

import { getSelf } from "@/lib/auth-service";
import { isBlockedByOtherUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import {init} from "@paralleldrive/cuid2";
import { AccessToken } from "livekit-server-sdk";

export const createViewerToken = async (hostIdentity: string) => {
    const createId = init({
        random: Math.random,
        length: 10,
        fingerprint: 'a-custom-host-fingerprint'
    });

    let self;

    try {
        self = await getSelf();
    } catch {
        const id =  createId()
        const username = `guest#${Math.floor(Math.random() * 1000)}`;
        self = {id, username};
    }
    
    const host = await getUserById(hostIdentity);

    if (!host) {
        throw new Error("Host not found");
    }

    const isBlocked = await isBlockedByOtherUser(host.id);

    if (isBlocked) {
        throw new Error("Blocked by host");
    }

    const isHost = self.id === host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIKEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.username,
        }
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    });

    return token.toJwt();
};