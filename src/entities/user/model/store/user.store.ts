import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../types/user.types";

// Интерфейс хранилища
interface Store {
  user: User;

  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<Store>()(
  devtools(
    immer((set) => ({
      user: {
        id: "",
        firstName: "",
        lastName: "",
        role: null,
        avatarUrl: "",
      },

      setUser(user: User) {
        set((state) => {
          state.user = user;
        });
      },
      clearUser() {
        set((state) => {
          state.user = {
            id: "",
            firstName: "",
            lastName: "",
            role: null,
            avatarUrl: "",
          };
        });
      },
    })),
    { name: "UserStore" },
  ),
);
