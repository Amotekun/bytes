"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    children
}) => {
    const {
        collapsed,
        onCollapse,
        onExpand,
    } = useCreatorSidebar((state) => state);
    const matches = useMediaQuery(`(max-width: 1024px)`)

    useEffect(() => {
        if (matches) {
            onCollapse()
        } else {
            onExpand()
        }
    }, [onCollapse, onExpand, matches])

    return (
        <div className={cn(
            "flex-1",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
        )}>
            {children}
        </div>
    );
};