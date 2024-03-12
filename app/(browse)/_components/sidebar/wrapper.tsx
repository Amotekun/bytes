"use client";

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"

interface WrapperProps {
    children: React.ReactNode
}
export const Wrapper: React.FC<WrapperProps> = ({
    children
}) => {

    const {collapsed} = useSidebar((state) => state);

    // TODO:Add useEffect here to handle Hydration Error 
    return (
        <aside
            className={cn(
                "w-60 bg-background border-r border-[#2D2E35] Z-50 fixed left-0 flex flex-col h-full",
                collapsed && "w-[70px]"
            )} 
        >
            {children}
        </aside>
    )
}