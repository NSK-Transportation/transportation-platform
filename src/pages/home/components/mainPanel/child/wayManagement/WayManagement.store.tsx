import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface WayManagementStore {}

export const useWayManagement = create<WayManagementStore>()(
  immer((set) => ({
    // TODO:  Добавить состояния
  })),
);
