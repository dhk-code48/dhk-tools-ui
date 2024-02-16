import { create } from "zustand";

interface State {
  state: boolean;
}

interface Actions {
  validateUser: () => void;
  unValidateUser: () => void;
}

export const useStore = create<State & Actions>((set) => ({
  state: false,
  validateUser: () => set(() => ({ state: true })),
  unValidateUser: () => set(() => ({ state: false })),
}));
