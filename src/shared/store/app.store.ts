import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  version: string;
}

export const useRefundStore = create<Store>()(
  immer(() => ({
    version: "0.1.0",
  })),
);
