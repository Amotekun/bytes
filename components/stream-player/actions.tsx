"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { onFollow, unFollow } from "@/action/follow";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ActionProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
};

export const Actions: React.FC<ActionProps> = ({
    hostIdentity,
    isFollowing,
    isHost,
}) => {
    const [isPending, startTransition] = useTransition();
    const {userId} = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.followed.username}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            unFollow(hostIdentity) 
                .then((data) => toast.success(`You have unfollowed ${data.followed.username}`))
                .catch(() => toast.error("Something went wrong"))

        })
    }

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in")
        } 

        if (isHost) return;

        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )}/> 
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}


/* TODO: ADD AN ACTION SKELETON HERE */