import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation";
import { Actions } from "./_components/action";
import { isBlockedByOtherUser } from "@/lib/block-service";

interface UsernameProps {
    params: {username: string}
}

export default async function Username({
    params
}: UsernameProps) {
    const user = await getUserByUsername(params.username);

    if (!user) {
        notFound();
    };

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByOtherUser(user.id);

    return (
        <div className="">
            <p>User: {user.username}</p>
            <p>User ID: {user.id}</p>
            <p>isFollowing: {`${isFollowing}`} </p>
            <p>is blocked by other user: {`${isBlocked}`}</p>
            <Actions
                isFollowing={isFollowing}
                userId={user.id}    
            />
        </div>
    )
};
