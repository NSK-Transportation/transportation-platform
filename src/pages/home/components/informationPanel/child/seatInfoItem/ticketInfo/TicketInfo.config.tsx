import { Store } from "../../../InformationPanel.store";

export interface Config {
  label: string;
  key: string;
  group?: string;
  optionsKey?: keyof Store["options"];
}

export interface ConfigGroup {
  [key: string]: Config[];
}

export const config: ConfigGroup = {
  passenger: [
    { label: "Фамилия:", key: "lastName" },
    { label: "Имя:", key: "firstName" },
    { label: "Отчество:", key: "patronymic" },
    { label: "Дата рождения:", key: "birthday" },
    { label: "Пол:", key: "gender" },
    { label: "Телефон:", key: "phone" },
  ],
  fullTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.type", optionsKey: "baggages" },
    { label: "Тип билета:", key: "ticket.[direction].type", optionsKey: "tickets" },
    { label: "Тип документа:", key: "identification.document.type", optionsKey: "documents" },
    { label: "Серия:", key: "identification.document.series" },
    { label: "Номер:", key: "identification.document.number" },
  ],
  childTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.type", optionsKey: "baggages" },
    { label: "Скидка:", key: "ticket.[direction].discount.type", optionsKey: "discounts_child" },
    { label: "Свидетельство о рожд.:", key: "identification.child.number" },
  ],
  privilegeTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.type", optionsKey: "baggages" },
    { label: "Тип льготы:", key: "identification.privilege.type", optionsKey: "privileges" },
    { label: "Серия:", key: "identification.privilege.series" },
    { label: "Номер:", key: "identification.privilege.number" },
    { label: "Тип документа:", key: "identification.document.type", optionsKey: "documents" },
    { label: "Серия:", key: "identification.document.series" },
    { label: "Номер:", key: "identification.document.number" },
  ],
  discountTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.type", optionsKey: "baggages" },
    { label: "Вид скидки:", key: "ticket.[direction].discount.type", optionsKey: "discounts_main" },
    { label: "Номер cтуденческого:", key: "identification.student.number" },
    { label: "Номер справки:", key: "identification.military.number" },
  ],
};
