import { Passenger } from "@/app/@types";

export interface Config {
  fields: {
    label: string;
    value: string | null;
    color?: string;
  }[];
}

// Функция принимает объект passenger и возвращает объект config
export const getConfig = (passenger: Passenger): Config => ({
  fields: [
    {
      label: "Тип документа",
      value: passenger.identification?.document?.rus || null,
    },
    {
      label: "Серия",
      value: passenger.identification?.document?.series || null,
    },
    {
      label: "Номер",
      value: passenger.identification?.document?.number || null,
    },
    {
      label: "Фамилия",
      value: passenger.lastName || null,
    },
    {
      label: "Имя",
      value: passenger.firstName || null,
    },
    {
      label: "Отчество",
      value: passenger.patronymic || null,
    },
    {
      label: "Дата рождения",
      value: passenger.birthday || null,
      color: "secondary",
    },
    {
      label: "Пол",
      value: passenger.gender?.rus || null,
      color: "secondary",
    },
    {
      label: "Телефон",
      value: `${passenger.phone?.code} ${passenger.phone?.number}` || null,
      color: "primary",
    },
  ],
});
