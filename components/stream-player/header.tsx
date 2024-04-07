"use client";

import { UserAvatar } from "@/components/user-avatar";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { VerifiedMark } from "@/components/verified-mark";
import { UserIcon } from "lucide-react";
import { Actions } from "./actions";

interface HeaderProps {
    imageUrl: string;
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    isFollowing: boolean;
    name: string;
}

export const Header: React.FC<HeaderProps> = ({
    imageUrl,
    hostName,
    hostIdentity,
    viewerIdentity,
    isFollowing,
    name,
}) => {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participants.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-3 lg:space-y-4 items-start justify-between px-4 mb-5">
            <div className="flex items-center gap-x-3">
                <UserAvatar 
                    imageUrl={imageUrl}
                    username={hostName}
                    showBadge
                    isLive={isLive}
                    size="lg"
                />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-lg font-semibold">
                            {hostName}
                        </h2>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm font-semibold">
                        {name}
                    </p>
                    {isLive ? (
                        <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                            <UserIcon className="h-4 w-4"/>
                            <p>
                                {participantCount} {participantCount === 1 ? "viewer" : "Viewers"}
                            </p>
                        </div>
                    ) : (
                        <p className="font-semibold text-xs text-muted-foreground">
                            Offline
                        </p>
                    )}
                </div>
            </div>
            <Actions 
                hostIdentity={hostIdentity}
                isFollowing={isFollowing}
                isHost={isHost}
            />
        </div>
    )
}

/* TODO: ADD AN HEADER SKELETON HERE */