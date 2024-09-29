/**
 * Общие функции для выполнения API-запросов, связанные с данными о рейсах.
 *
 * Все функции используют настроенный экземпляр Axios (`axiosInstance`) для взаимодействия с API.
 * Эти функции возвращают данные с сервера и могут быть использованы в различных частях приложения.
 *
 * Экспортируемые функции:
 * - `getWays`: Получение списка всех доступных рейсов.
 * - `getPassenger`: Получение данных пассажира
 *
 */

import { Document, Passenger, Way, WayDetail } from "@/app/@types";
import { axiosInstance } from "./axiosInstance";

export const getWays = async (way: Way) => {
  const response = await axiosInstance.get<WayDetail[]>(`/ways`, {
    params: {
      "from.date": way.date,
      "from.city.name": way.from.city,
      "from.station.name": way.from.station,
      "to.city.name": way.to.city,
      "to.station.name": way.to.station,
    },
  });

  return response.data;
};

export const getPassenger = async (document: Document) => {
  const response = await axiosInstance.get<Passenger[]>(`/passengers`, {
    params: {
      "identification.document.series": document.series,
      "identification.document.number": document.number,
    },
  });

  return response.data[0];
};
