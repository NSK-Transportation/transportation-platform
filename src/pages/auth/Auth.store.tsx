import { Authorization } from "@/app/@types";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
interface Store {
  isAuth: boolean;
  data: Authorization;

  setAuth: (payload: Partial<Authorization> & { isAuth?: boolean }) => void;
}

const useAuthStore = create<Store>()(
  devtools(
    persist(
      immer((set) => ({
        isAuth: false,
        data: {
          userID: "",
          password: "",
        },

        setAuth: (payload) =>
          set((state) => ({
            ...state,
            isAuth: payload.isAuth ?? state.isAuth,
            data: {
              ...state.data,
              ...payload,
            },
          })),
      })),
      {
        name: "AuthStore",
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          data: {
            userID: state.data.userID,
          },
        }),
      },
    ),
    { name: "AuthStore" },
  ),
);

export { useAuthStore };
