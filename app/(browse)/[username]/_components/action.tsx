"use client";

import { onBlock, onUnBlock } from "@/action/block";
import { onFollow, unFollow } from "@/action/follow";
import { Button } from "@/components/ui/button"
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
    isFollowing: boolean;
    userId: string;
}
export const Actions: React.FC<ActionProps> = ({
    isFollowing,
    userId,
}) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`followed ${data.followed.username}`))
                .catch(() => toast.error("failed to follow"))
        })
    };

    const handleUnfollow = () => {
        startTransition(() => {
            unFollow(userId)
                .then((data) => {
                    if (data) {
                        toast.success(`unfollowed ${data.followed.username}`)
                    } else {
                        toast.error("failed to unfollow")
                    }
                })
                .catch(() => toast.error("failed to unfollow"))
        })
    } 

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => {
                    if (data) {
                        toast.success(`blocked ${data.blocked.username}`)
                    } else {
                        toast.error("failed to block")
                    }
                })
                .catch(() => toast.error("failed to block"))
        })
    }
    
    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    return (
        <>
            <Button
                disabled={isPending}
                onClick={onClick}
                variant="primary"
                >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                disabled={isPending}
                onClick={handleBlock}
                variant="destructive"
            >
                Block
            </Button>
        </>
    )
}