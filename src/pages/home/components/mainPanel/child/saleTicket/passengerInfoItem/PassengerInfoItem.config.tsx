export interface Config {
  type: string;
  label: string;
  key: string;
  placeholder?: string;
  inputType?: string;
  optionsKey?: string;
}

export interface ConfigGroup {
  step1: Config[];
  step2: { [key: string]: Config[] };
  common: Config[];
}

export const config: ConfigGroup = {
  step1: [
    {
      type: "select",
      label: "Тип билета",
      key: "ticket.[direction].type",
      optionsKey: "tickets",
      placeholder: "Выберите билет",
    },
    {
      type: "select",
      label: "Багажный билет",
      key: "baggage",
      optionsKey: "baggages",
      placeholder: "Выберите багаж",
    },
  ],
  step2: {
    discount: [
      {
        type: "chip",
        label: "Скидка",
        key: "ticket.[direction].discount",
        optionsKey: "main",
        placeholder: "Выберите скидку",
      },
    ],
    privilege: [
      {
        type: "select",
        label: "Тип льготы",
        key: "privilegeType",
        optionsKey: "privileges",
        placeholder: "Выберите льготу",
      },
      {
        type: "input",
        label: "Документ на право льготы - Серия",
        key: "privilegeSeries",
        placeholder: "-- --",
      },
      {
        type: "input",
        label: "Документ на право льготы - Номер",
        key: "privilegeNumber",
        placeholder: "--- ---",
      },
    ],
  },
  common: [
    {
      type: "input",
      label: "Фамилия",
      key: "lastName",
      placeholder: "Например, Плеханова",
    },
    {
      type: "input",
      label: "Имя",
      key: "firstName",
      placeholder: "Например, Татьяна",
    },
    {
      type: "input",
      label: "Отчество",
      key: "patronymic",
      placeholder: "Например, Фёдоровна",
    },
    {
      type: "input",
      label: "Дата рождения",
      key: "birthday",
      inputType: "date",
      placeholder: "Выберите дату рождения",
    },
    {
      type: "input",
      label: "Телефон",
      key: "phone",
      placeholder: "+ 7 (---) --- -- --",
    },
    {
      type: "radioGroup",
      label: "Пол",
      key: "gender",
      optionsKey: "genders",
    },
  ],
};
