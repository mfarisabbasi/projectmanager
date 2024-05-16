import { create } from "zustand";

const userStore = create((set) => ({
  user: undefined,
  setUser: (userData) => set({ user: userData }),
  removeUser: () => set({ user: undefined }),
}));

export default userStore;
