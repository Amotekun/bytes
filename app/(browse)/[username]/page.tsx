import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation";
import { isBlockedByOtherUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UsernameProps {
    params: {username: string}
}

export default async function Username({
    params
}: UsernameProps) {
    const user = await getUserByUsername(params.username);

    if (!user || !user.stream) {
        notFound();
    };

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByOtherUser(user.id);

    if (isBlocked) {
        notFound();
    };

    return (
        <div className="">
            <StreamPlayer 
                user={user}
                stream={user.stream}
                isFollowing={isFollowing}
            />
        </div>
    )
};

//TODO: ADD A STREAM PLAYER SKELETON TO THE USER [USERNAME] FOLDER/ROUTE
