import { create } from "zustand"

interface SidebaStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}
export const useSidebar = create<SidebaStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapse: () => set(() => ({collapsed: true})),
}));