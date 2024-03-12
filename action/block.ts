"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    console.log("Blocked user", blockedUser);

    return blockedUser;

};

export const onUnBlock = async (id: string) => {
    const onUnBlock = await unblockUser(id); 

    revalidatePath("/");

    if (onUnBlock) {
        revalidatePath(`/${onUnBlock.blocked.username}`);
    }

    return onUnBlock;
};