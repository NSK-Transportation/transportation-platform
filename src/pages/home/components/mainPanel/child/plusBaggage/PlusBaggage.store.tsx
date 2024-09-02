import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface PlusBaggageStore {}

export const usePlusBaggage = create<PlusBaggageStore>()(
  immer((set) => ({
    // TODO:  Добавить состояния
  })),
);
