import { 
    Avatar, 
    AvatarImage, 
    AvatarFallback 
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./ui/skeleton";

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-14",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

interface UserAvatarProps
    extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
    username,
    imageUrl,
    isLive,
    showBadge ,
    size,
}) => {
    const canShowBadge = showBadge && isLive;

    const firstChar = username ? username[0] : "";
    const lastChar = username ? username[username.length - 1] : "";


    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-rose-500 border border-background ",
                    avatarSizes({size})

                )}
            >
                <AvatarImage 
                    src={imageUrl}
                    className="object-cover"
                />
                <AvatarFallback>
                    {firstChar}
                    {lastChar}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 ">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
};

interface UserAvatarSkeletonProps 
    extends VariantProps<typeof avatarSizes> {};

export const UserAvatarSkeleto: React.FC<UserAvatarSkeletonProps> = ({
    size,
}) => {
    return (
        <Skeleton 
            className={cn(
                "rounded-full",
                avatarSizes({ size })
            )}
        />
    )
}
