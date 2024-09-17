/**
 * Общие функции для выполнения API-запросов, связанные с данными о рейсах.
 *
 * Все функции используют настроенный экземпляр Axios (`axiosInstance`) для взаимодействия с API.
 * Эти функции возвращают данные с сервера и могут быть использованы в различных частях приложения.
 *
 * Экспортируемые функции:
 * - `getWays`: Получение списка всех доступных рейсов.
 *
 */

import { Direction, Way, WayDetails } from "@/app/@types";
import { axiosInstance } from "./axiosInstance";

export const getWays = async (data: Way, direction: Direction) => {
  const response = await axiosInstance.get<WayDetails[]>(`/users/?direction=${direction}`, { data });

  const formattedData: WayDetails[] = response.data.map((user: any) => ({
    id: user.id,
    wayNumber: user.id,
    whoArive: user.name,
    price: 1276,
    seatsSelected: [],
    seats: [
      { id: 1, status: "free" },
      { id: 2, status: "free" },
      { id: 3, status: "booking" },
      { id: 4, status: "occupied" },
      { id: 5, status: "free" },
      { id: 6, status: "free" },
      { id: 7, status: "free" },
      { id: 8, status: "free" },
      { id: 9, status: "free" },
      { id: 10, status: "free" },
      { id: 11, status: "free" },
    ],
    from: {
      city: "Москва",
      street: "ул.Ленина",
      house: "67",
      station: "ЖД Вокзал",
      time: "13:20",
      date: "26 июня",
    },
    to: {
      city: "Кемерово",
      street: "пр.Кузнецкий",
      house: "81",
      station: "",
      time: "17:50",
      date: "26 июня",
    },
    bus: {
      id: 1,
      busNumber: "А-123",
      driver: "Иванов И.И.",
      nameBus: "Автобус",
      atpType: "АТП",
      occupied: 22,
      free: 15,
      typeBus: "Люкс",
      standPlace: 106,
      bagPlace: 15,
    }
  }));

  return formattedData;
};

export const getWaysManagement = async (data: Way) => {
  const response = await axiosInstance.get<WayDetails[]>(`/users/`, { data });

  const formattedData: WayDetails[] = response.data.map((user: any) => ({
    id: user.id,
    wayNumber: user.id,
    whoArive: user.name,
    price: 1276,
    seatsSelected: [],
    seats: [
      { id: 1, status: "free" },
      { id: 2, status: "free" },
      { id: 3, status: "booking" },
      { id: 4, status: "occupied" },
      { id: 5, status: "free" },
      { id: 6, status: "free" },
      { id: 7, status: "free" },
      { id: 8, status: "free" },
      { id: 9, status: "free" },
      { id: 10, status: "free" },
      { id: 11, status: "free" },
    ],
    from: {
      city: "Москва",
      street: "ул.Ленина",
      house: "67",
      station: "ЖД Вокзал",
      time: "13:20",
      date: "26 июня",
    },
    to: {
      city: "Кемерово",
      street: "пр.Кузнецкий",
      house: "81",
      station: "Кемерово АВ",
      time: "17:50",
      date: "26 июня",
    },
    bus: {
      id: 1,
      busNumber: "О452УВ 154",
      driver: "Гусев А",
      nameBus: "YUTONG ZK6",
      atpType: "ООО “НСК-АВТО”",
      occupied: 22,
      free: 15,
      typeBus: "Автобус",
      standPlace: 106,
      bagPlace: 15,
  }
  }));

  return formattedData;
};
