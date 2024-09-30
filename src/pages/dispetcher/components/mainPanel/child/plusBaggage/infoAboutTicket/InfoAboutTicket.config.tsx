import { Direction, Passenger } from "@/app/@types";

export interface Config {
  fields: {
    label: string;
    value: string | number | null;
    color?: string;
  }[];
}

// Функция принимает объект passenger и возвращает объект config
export const getConfig = (passenger: Passenger, direction: Direction): Config => ({
  fields: [
    {
      label: "Посадочное место",
      value: passenger.ticket?.[direction]?.seatId || null,
    },
    {
      label: "Багажное место",
      value: passenger.ticket?.[direction]?.baggage?.count || null,
    },
    {
      label: "Тип билета",
      value: passenger.ticket?.[direction]?.type || null,
      color: "primary",
    },
    {
      label: "Вид скидки",
      value: passenger.ticket?.[direction]?.discount?.rus || null,
      color: "info",
    },
    {
      label: "Скидка",
      value: passenger.ticket?.[direction]?.discount?.value || null,
      color: "info",
    },
    {
      label: "Номер студенческого / справки",
      value:
        (passenger.ticket?.[direction]?.identification?.military ||
          passenger.ticket?.[direction]?.identification?.student?.number) as string ??
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
