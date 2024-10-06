/* eslint-disable @conarti/feature-sliced/absolute-relative */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Country } from "../types/country.types";

// Интерфейс хранилища
export interface Store {
  options: {
    countries: Country[];
  };
}

// Добавить все возможные маски статично или добавить запрос на их получение

export const useCountryStore = create<Store>()(
  immer((set) => ({
    options: {
      countries: [
        {
          id: 1,
          name: "Russia",
          rus: "Россия",
          code: "RU",
          dialCode: "+7",
          flag: "https://flagcdn.com/w320/ru.png",
        },
        {
          id: 2,
          name: "United States",
          rus: "США",
          code: "US",
          dialCode: "+1",
          flag: "https://flagcdn.com/w320/us.png",
        },
        {
          id: 3,
          name: "Germany",
          rus: "Германия",
          code: "DE",
          dialCode: "+49",
          flag: "https://flagcdn.com/w320/de.png",
        },
      ],
    },
  })),
);
