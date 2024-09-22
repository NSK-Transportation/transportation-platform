/**
 * Общие функции для выполнения мутаций данных через API, связанные с рейсами.
 *
 * Все функции используют настроенный экземпляр Axios (`axiosInstance`) для взаимодействия с API.
 * Эти функции предназначены для изменения данных на сервере и могут быть использованы в различных частях приложения.
 *
 * Экспортируемые функции:
 * - `postPayment`: Оплата рейса.
 *
 */

import { Payment } from "@/app/@types";
import { axiosInstance } from "./axiosInstance";

export const postPayment = async (payment: Payment, amount: number) => {
  const response = await axiosInstance.post("/payments", {
    type: payment.type,
    amount,
  });

  return response.data;
};
