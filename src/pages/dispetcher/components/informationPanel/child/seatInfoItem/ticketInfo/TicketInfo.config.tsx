import { SaleTicketStore } from "@/pages/home/components/mainPanel";

export interface Config {
  label: string;
  key: string;
  group?: string;
  optionsKey?: keyof SaleTicketStore["options"];
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
    { label: "Пол:", key: "gender", optionsKey: "genders" },
    { label: "Телефон:", key: "phone.code", group: "code-number" },
    { label: "", key: "phone.number", group: "code-number" },
  ],
  fullTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.count" },
    { label: "Тип билета:", key: "ticket.[direction].type", optionsKey: "tickets" },
    { label: "Тип документа:", key: "identification.document.type", optionsKey: "documents" },
    { label: "Серия:", key: "identification.document.series" },
    { label: "Номер:", key: "identification.document.number" },
  ],
  childTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.count" },
    { label: "Скидка:", key: "ticket.[direction].discount.type", optionsKey: "discounts" },
    { label: "Свидетельство о рожд.:", key: "identification.child.number" },
  ],
  privilegeTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.count" },
    { label: "Тип льготы:", key: "identification.privilege.type", optionsKey: "privileges" },
    { label: "Серия:", key: "identification.privilege.series" },
    { label: "Номер:", key: "identification.privilege.number" },
    { label: "Тип документа:", key: "identification.document.type", optionsKey: "documents" },
    { label: "Серия:", key: "identification.document.series" },
    { label: "Номер:", key: "identification.document.number" },
  ],
  discountTicket: [
    { label: "Багажное место:", key: "ticket.[direction].baggage.count" },
    { label: "Вид скидки:", key: "ticket.[direction].discount.type", optionsKey: "discounts" },
    { label: "Номер cтуденческого:", key: "identification.student.number" },
    { label: "Номер справки:", key: "identification.military.number" },
  ],
};
