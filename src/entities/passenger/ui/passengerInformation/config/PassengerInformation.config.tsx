/* eslint-disable @conarti/feature-sliced/absolute-relative */
import { Passenger } from "@/entities/passenger/model/types/passenger.types";

export interface Config {
  fields: {
    label: string;
    value: string | null;
    color?: string;
  }[];
}

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
      value: passenger.gender || null,
      color: "secondary",
    },
    {
      label: "Телефон",
      value: `${passenger.phone?.code} ${passenger.phone?.number}` || null,
      color: "primary",
    },
  ],
});
