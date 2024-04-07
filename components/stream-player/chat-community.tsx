"use client";

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParticipants } from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useMemo, useState } from "react";
import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
    isHidden: boolean;
    viewerName: string;
    hostName: string;

};

export const ChatCommunity: React.FC<ChatCommunityProps>= ({
    isHidden,
    viewerName,
    hostName,
}) => {
    const [value, setValue] = useState("");
    const participants = useParticipants();
    
    const debounce = (callback: (value: string) => void, delay: number ) => {
        let timeout: any = null;
        return (value: string) =>  {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                callback(value);
            }, delay);
        };
    };

    const debouncedSetValue = debounce(setValue, 500);
    
    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }

            return acc;
        }, [] as (RemoteParticipant | LocalParticipant) []);

        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(value.toLowerCase())
        })
    }, [participants, value]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    }

  return (
    <div className="p-4">
        <Input 
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search the community..."
            className="border-white/10"
        />
        <ScrollArea className="gap-y-2 mt-4">
            <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                No results
            </p>
            {filteredParticipants.map((participant) => (
                <CommunityItem
                    key={participant.identity}
                    hostName={hostName}
                    viewerName={viewerName}
                    participantName={participant.name}
                    participantIdentity={participant.identity}
                />
            ))}
        </ScrollArea>
    </div>
  )
}