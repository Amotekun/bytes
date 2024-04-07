"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChatInfo } from "@/components/stream-player/chat-info";

interface ChatFormProps {
    onSubmit: () => void
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowing: boolean;
    isFollowersOnly: boolean;
    isDelayed: boolean;
};

export const ChatForm: React.FC<ChatFormProps> = ({
    value,
    onChange,
    isHidden,
    onSubmit,
    isFollowing,
    isFollowersOnly,
    isDelayed,
}) => {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);
    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing; // study this later


    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!value || isDisabled) return;

        if (isDisabled && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }
    }

    if (isHidden) {
        return null;
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4 p-3"
        >
            <div className="w-full">
                <ChatInfo 
                    isDelayed={isDelayed}
                    isFollowersOnly={isFollowersOnly}
                /> 
                <Input  
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className={cn(
                        "border-white/10",
                        (isFollowersOnly || isDelayed) &&  "rounded-t-none border-t-0"
                    )}
                />
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    );
};

/* TODO: CHAT FORM SKELETON */