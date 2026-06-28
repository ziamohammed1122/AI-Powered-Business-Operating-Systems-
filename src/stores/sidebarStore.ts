import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleOpen: () => void;
  toggleCollapsed: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      isCollapsed: false,
      toggleOpen: () => set((s) => ({ isOpen: !s.isOpen })),
      toggleCollapsed: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
      setOpen: (open) => set({ isOpen: open }),
    }),
    { name: 'memoryos-sidebar' }
  )
);
