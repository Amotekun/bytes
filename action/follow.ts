"use server";

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        revalidatePath("/");

        if (followedUser) {
            revalidatePath(`${followedUser.followed.username}`)
        }

        return followedUser
    } catch (error) {
        throw new Error("Internal Error")
    };
};

export const unFollow = async (id: string) => {
    try {
        const unfollowUser = await unFollowUser(id);

        revalidatePath("/");

        if (unfollowUser) {
            revalidatePath(`${unfollowUser.followed.username}`)
        }

        return unfollowUser;
    } catch (error) {
        throw new Error("Internal Error")
    };
};
