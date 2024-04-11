"use client";

import { onUnBlock } from "@/action/block";
import { Button } from "@/components/ui/button"
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId: string;
};

export const UnblockButton: React.FC<UnblockButtonProps> = ({
    userId,
}) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onUnBlock(userId)
                .then((result) => toast.success(`User ${result.blocked.username} unblocked`))
                .catch(() => toast.error("Something went wrong"));
        })
    }
    return (
        <Button
            disabled={isPending}
            onClick={onClick}
            variant="link"
            size="sm"
            className="text-blue-500 w-full"
        >
            Unlock
        </Button>
    )
}