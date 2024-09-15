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

import { Direction, DiscountType, SeatStatus, Way, WayDetail, WayDetailStatus } from "@/app/@types";
import { axiosInstance } from "./axiosInstance";
import { random, sampleSize } from "lodash";

export const getWays = async (data: Way, direction: Direction) => {
  const response = await axiosInstance.get<WayDetail[]>(`/users/?direction=${direction}`, {
    data,
  });

  const generateSeats = (numSeats: number) => {
    const statuses: SeatStatus[] = ["free", "occupied", "booking"];
    return Array.from({ length: numSeats }, (_, index) => ({
      id: index + 1,
      status: statuses[random(0, statuses.length - 1)],
    }));
  };

  const generateRandomDiscounts = () => {
    const availableDiscounts = [
      {
        id: 1,
        type: DiscountType.STUDENT,
        value: 50,
        rus: "Студенческий",
      },
      {
        id: 2,
        type: DiscountType.MILITARY,
        value: 50,
        rus: "СВО",
      },
    ];

    return sampleSize(availableDiscounts, random(1, 2));
  };

  const generateRandomStatus = () => {
    const availableStatuses: WayDetailStatus[] = ["sale", "closed"];
    return availableStatuses[random(0, availableStatuses.length - 1)];
  };

  const formattedData: WayDetail[] = response.data.map((user: any) => ({
    id: user.id,
    wayNumber: user.id,
    whoArive: user.name,
    status: generateRandomStatus(),
    ticket: {
      price: random(1000, 10000, false),
    },
    baggage: {
      price: random(240, 1000, false),
      count: random(20, 40, false),
    },
    discounts: generateRandomDiscounts(),
    seats: generateSeats(random(20, 40)),
    from: {
      city: "Москва",
      street: "ул.Ленина",
      house: "67",
      station: "ЖД Вокзал",
      time: `${random(0, 23, false)}:${random(0, 59, false)}`,
      date: "26 июня",
    },
    to: {
      city: "Кемерово",
      street: "пр.Кузнецкий",
      house: "81",
      station: "ЖД Вокзал",
      time: `${random(0, 23, false)}:${random(0, 59, false)}`,
      date: "26 июня",
    },
  }));

  return formattedData;
};
