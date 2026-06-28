import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,
      toggle: () =>
        set((state) => {
          const newDark = !state.isDark;
          document.documentElement.classList.toggle('light', !newDark);
          return { isDark: newDark };
        }),
      setDark: (dark: boolean) =>
        set(() => {
          document.documentElement.classList.toggle('light', !dark);
          return { isDark: dark };
        }),
    }),
    { name: 'memoryos-theme' }
  )
);
