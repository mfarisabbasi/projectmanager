import { create } from "zustand";

export const userStore = create((set) => ({
  user: undefined,
  setUser: (userData) => set({ user: userData }),
  removeUser: () => set({ user: undefined }),
}));

export const workspaceStore = create((set) => ({
  workspaces: undefined,
  setWorkspaces: (workspaces) => set({ workspaces: workspaces }),
  // removeUser: () => set({ user: undefined }),
}));
