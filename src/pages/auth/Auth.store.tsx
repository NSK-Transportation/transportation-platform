import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
interface Store {
  isAuth: boolean;
  userID: string;
  password: string;

  setUserID: (userID: string) => void;
  setPassword: (password: string) => void;
  setAuth: (isAuth: boolean) => void;
}

const useAuthStore = create<Store>()(
  devtools(
    immer((set) => ({
      isAuth: false,
      userID: "",
      password: "",

      setUserID: (userID) => set({ userID }),
      setPassword: (password) => set({ password }),
      setIsAuth: (isAuth) => set({ isAuth }), 
    })),
    { name: "AuthStore" },
  ),
);

export { useAuthStore };
