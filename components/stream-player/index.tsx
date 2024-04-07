"use client";

import {LiveKitRoom} from "@livekit/components-react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Video } from "./video";
import { Chat } from "./chat";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ChatToggle } from "./chat-toggle";
import { Header } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";

type CustomStream = {
    id: string;
    name: string;
    isLive: boolean;
    thumbnailUrl: string |null;
    isChatEnabled: boolean;
    isChatFollowersOnly: boolean;
    isChatDelayed: boolean;
}

type CustomUser = {
    id: string;
    username: string;
    imageUrl: string;
    bio: string | null;
    stream: Stream | null;
    _count: {followed: number}
}
interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream;
    isFollowing: boolean;
};

export const StreamPlayer: React.FC<StreamPlayerProps> = ({
    user,
    stream,
    isFollowing,
}) => {
    const {collapsed} = useChatSidebar((state) => state)
    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);

    if (!token || !name || !identity) {
        return (
            <div>
                Cannot reach here
            </div>
        )
    }

    return (
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn(
                    "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                <div className="col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video 
                        hostName={user.username}
                        hostIdentity={user.id}
                    />
                    <Header 
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        imageUrl={user.imageUrl}
                        isFollowing={isFollowing}
                        name={stream.name}
                        
                    />
                    <InfoCard 
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                        hostIdentity={user.id}
                        viewerIdentity={identity}

                    />
                    <AboutCard 
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        bio={user.bio}
                        followedByCount={user._count.followed}
                    />
                </div>
                <div className={cn(
                    "col-span-1",
                    collapsed && "hidden"
                )}>
                    <Chat 
                        isChatEnabled={stream.isChatEnabled}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                        isChatDelayed={stream.isChatDelayed}
                        viewerName={name}
                        hostName={user.username}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}

/* TODO: ADD INDEX SKELETON */