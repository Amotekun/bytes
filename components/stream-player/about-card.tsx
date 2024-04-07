"use client";

import { VerifiedMark } from "@/components/verified-mark";
import { BioModal } from "./bio-modal";

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByCount: number;
};

export const AboutCard: React.FC<AboutCardProps> = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount,
}) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = hostAsViewer === viewerIdentity;

    const followedByLabel = followedByCount === 1 ? "follower" : "followers";

    return (
        <div className="px-4 mt-4">
            <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        About {hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && (
                        <BioModal 
                            initialValue={bio}
                        />
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span> 
                        {followedByCount}
                    </span> {followedByLabel}
                </div>
                <div className="text-sm">
                    {bio || "This user prefers to remain anonymous."}
                </div>
            </div>
        </div>
    )
}