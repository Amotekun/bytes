"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
    children
}) => {
    const {collapsed} = useCreatorSidebar((state) => state);

    return (
        <aside className={cn(
          "fixed left-0 flex flex-col lg:w-60 w-[70px] h-full bg-background border-[#2D2E35] border-r z-50",
          collapsed && "lg:w-[70px]"
        )}>
            {children}
        </aside>
    )
}