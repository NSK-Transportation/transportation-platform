/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Passenger } from "@/entities/passenger";
import { Direction } from "@/shared/types";

export interface Config {
  fields: {
    label: string;
    value: string | number | null;
    color?: string;
  }[];
}

export const getConfig = (passenger: Passenger, direction: Direction): Config => ({
  fields: [
    {
      label: "Посадочное место",
      value: passenger.ticket?.[direction]?.seatId || null,
    },
    {
      label: "Багажное место",
      value: passenger.ticket?.[direction]?.baggage?.count || "Нет багажа",
    },
    {
      label: "Тип билета",
      value: passenger.ticket?.[direction]?.rus || null,
      color: "primary",
    },
    {
      label: "Вид скидки",
      value: passenger.ticket?.[direction]?.discount?.rus || "Без скидки",
      color: "info",
    },
    {
      label: "Скидка",
      value: passenger.ticket?.[direction]?.discount?.rus || "Без скидки",
      color: "info",
    },
    {
      label: "Номер студенческого / справки",
      value:
        (passenger.identification?.military?.number || passenger.identification?.student?.number) ??
        null,
    },
    {
      label: "Тип оплаты",
      value: passenger.ticket?.[direction]?.payment?.rus || "Null",
      color: "info",
    },
    {
      label: "Кассир",
      value: passenger.ticket?.[direction]?.cashier?.firstName || "Null",
    },
    {
      label: "Дата продажи",
      value: passenger.ticket?.[direction]?.saleDate || "Null",
      color: "info",
    },
    {
      label: "Время продажи",
      value: passenger.ticket?.[direction]?.saleTime || "Null",
      color: "info",
    },
  ],
});
