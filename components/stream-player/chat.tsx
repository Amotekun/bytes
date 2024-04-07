"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"
import { ChatHeader } from "@/components/stream-player/chat-header"
import { ChatList } from "@/components/stream-player/chat-list";
import { ConnectionState } from "livekit-client";
import { 
    useChat, 
    useConnectionState, 
    useRemoteParticipant 
} from "@livekit/components-react";
import { useMemo, useState } from "react";
import { ChatForm } from "./chat-form";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
    isChatEnabled: boolean;
    hostIdentity: string;
    isChatFollowersOnly: boolean;
    isFollowing: boolean;
    isChatDelayed: boolean;
    hostName: string;
    viewerName: string;
}

export const Chat: React.FC<ChatProps> = ({
    isChatEnabled,
    hostIdentity,
    isChatFollowersOnly,
    isFollowing,
    isChatDelayed,
    hostName,
    viewerName,
}) => {
    const {
        variant,
        onExpand,
    } = useChatSidebar((state) => state);

    const [value, setvalue] = useState("");
    const {chatMessages: messages, send} = useChat();

    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages])

    const onSubmit = () => {
        if (!send) return;

        send(value);
        setvalue("");
    };

    const onChange = (value: string) => {
        setvalue(value);
    }
    
    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList 
                        messages={reversedMessages}
                        isHidden={isHidden}
                    />
                    <ChatForm 
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isFollowing={isFollowing}
                        isFollowersOnly={isChatFollowersOnly}
                        isHidden={isHidden}
                        isDelayed={isChatDelayed}
                    />
                </>
            )}
            <>
                {variant === ChatVariant.COMMUNITY && (
                    <ChatCommunity 
                        viewerName={viewerName}
                        isHidden={isHidden}
                        hostName={hostName}
                    />
                )}
            </>
        </div>
    )
}

/* TODO: CHAT SKELETON */ 