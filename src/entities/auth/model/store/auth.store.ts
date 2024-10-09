import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// import { Authorization } from "../types/auth.types";

// Интерфейс хранилища
interface Store {
  isAuth: boolean;

  setAuth: (isAuth: boolean) => void;
}

const useAuthStore = create<Store>()(
  devtools(
    immer((set) => ({
      isAuth: false,

      setAuth: (isAuth) => set((state) => ({ ...state, isAuth })),
    })),
    { name: "AuthStore" },
  ),
);

export { useAuthStore };
