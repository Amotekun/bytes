"use client";

import { cn, stringToColor } from "@/lib/utils";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import { onBlock } from "@/action/block";
import { toast } from "sonner";

interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
}

export const CommunityItem: React.FC<CommunityItemProps> = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity,
}) => {
    const [isPending, startTransition] = useTransition();
    
    const color = stringToColor(participantName || "");
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return;

        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
            isPending && "opacity-50 pointer-events-none"
        )}>
            <p style={{color: color}}>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block">
                    <Button 
                        variant="ghost"
                        disabled={isPending}
                        onClick={handleBlock}
                        className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                        <MinusCircle className="w-4 h-4 text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    ) 
}