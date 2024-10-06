import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Authorization } from "../types/auth.types";

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
          id: "",
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
            id: state.data.id,
          },
        }),
      },
    ),
    { name: "AuthStore" },
  ),
);

export { useAuthStore };
