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
      //добавить поля
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
    price: 1276,
//     seats: [
//       { id: 1, status: "free", documentSeria: "1234", documentNumber: "123456", price: 1276, tariff: 1000, duty: 50, dateSale: "26 сентября", whoSold: "Кассир Иванова А.И." },
//       { id: 2, status: "free", documentSeria: "5224", documentNumber: "348594", price: 1276, tariff: 1000, duty: 50, dateSale: "25 сентября", whoSold: "Кассир Петров А.И." },
//       { id: 3, status: "booking", documentSeria: "А-2-4", documentNumber: "455-445-348594", price: 1500, tariff: 1200, duty: 150, dateSale: "24 августа", whoSold: "Кассир Петров А.И." },
//       { id: 4, status: "occupied", documentSeria: "БГ-76", documentNumber: "655-445-348594", price: 12500, tariff: 1100, duty: 110, dateSale: "23 августа", whoSold: "Кассир Петров А.И." },
//       { id: 5, status: "free", documentSeria: "А-2-4", documentNumber: "455-445-348594", price: 1500, tariff: 1200, duty: 150, dateSale: "22 августа", whoSold: "Кассир Петров А.И." },
//       { id: 6, status: "free", documentSeria: "АГ-76", documentNumber: "655-445-348594", price: 12500, tariff: 1100, duty: 110, dateSale: "21 августа", whoSold: "Кассир Петров А.И." },
//       { id: 7, status: "free", documentSeria: "9767", documentNumber: "748594", price: 1500, tariff: 1200, duty: 150, dateSale: "20 августа", whoSold: "Кассир Петров А.И." },
//       { id: 8, status: "free", documentSeria: "3989", documentNumber: "148594", price: 1500, tariff: 1200, duty: 150, dateSale: "19 августа", whoSold: "Кассир Петров А.И." },
//       { id: 9, status: "free", documentSeria: "", documentNumber: "", price: 0, tariff: 0, duty: 0, dateSale: "", whoSold: "" },
//       { id: 10, status: "free", documentSeria: "", documentNumber: "", price: 0, tariff: 0, duty: 0, dateSale: "", whoSold: "" },
//       { id: 11, status: "free", documentSeria: "", documentNumber: "", price: 0, tariff: 0, duty: 0, dateSale: "", whoSold: "" },
//     ],
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
      { id: 1, status: "free", documentSeria: "1234", documentNumber: "123456", price: 1276, tariff: 1000, duty: 50, dateSale: "26 сентября", whoSold: "Кассир Иванова А.И." },
      { id: 2, status: "free", documentSeria: "5224", documentNumber: "348594", price: 1276, tariff: 1000, duty: 50, dateSale: "25 сентября", whoSold: "Кассир Петров А.И." },
      { id: 3, status: "booking", documentSeria: "А-2-4", documentNumber: "455", price: 1500, tariff: 1200, duty: 150, dateSale: "24 августа", whoSold: "Кассир Петров А.И." },
      { id: 4, status: "occupied", documentSeria: "БГ-76", documentNumber: "655", price: 12500, tariff: 1100, duty: 110, dateSale: "23 августа", whoSold: "Кассир Петров А.И." },
      { id: 5, status: "free", documentSeria: "А-2-4", documentNumber: "455-445", price: 1500, tariff: 1200, duty: 150, dateSale: "22 августа", whoSold: "Кассир Петров А.И." },
      { id: 6, status: "free", documentSeria: "АГ-76", documentNumber: "655-445", price: 12500, tariff: 1100, duty: 110, dateSale: "21 августа", whoSold: "Кассир Петров А.И." },
      { id: 7, status: "free", documentSeria: "9767", documentNumber: "748594", price: 1500, tariff: 1200, duty: 150, dateSale: "20 августа", whoSold: "Кассир Петров А.И." },
      { id: 8, status: "free", documentSeria: "3989", documentNumber: "148594", price: 1500, tariff: 1200, duty: 150, dateSale: "19 августа", whoSold: "Кассир Петров А.И." },
      { id: 9, status: "free", documentSeria: "", documentNumber: "", price: 0, tariff: 0, duty: 0, dateSale: "", whoSold: "" },
      { id: 10, status: "free", documentSeria: "", documentNumber: "", price: 0, tariff: 0, duty: 0, dateSale: "", whoSold: "" },
      { id: 11, status: "free", documentSeria: "", documentNumber: "", price: 0, tariff: 0, duty: 0, dateSale: "", whoSold: "" },
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
