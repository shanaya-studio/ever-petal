import { create } from "zustand";

const useThemeStore = create((set) => ({
  // State
  theme: "light",

  // Action
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

export default useThemeStore;