import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {}

export const useWayManagement = create<Store>()(
  immer((set) => ({
    // TODO:  Добавить состояния
  })),
);
