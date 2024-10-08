import { object, string, date } from "yup";

export const passengerSchema = object().shape({
  lastName: string().required("Фамилия обязательна"),
  firstName: string().required("Имя обязательно"),
  patronymic: string().required("Отчество обязательно"),
  birthday: date()
    .required("Дата рождения обязательна")
    .max(new Date(), "Дата рождения не может быть в будущем"),
  phone: object({
    number: string()
      .matches(/^[0-9]{10}$/, "Некорректный формат номера")
      .required("Номер телефона обязателен"),
    code: string().required("Код страны обязателен"),
  }),
  gender: string().oneOf(["male", "female"], "Выберите пол").required().nullable(),
});
