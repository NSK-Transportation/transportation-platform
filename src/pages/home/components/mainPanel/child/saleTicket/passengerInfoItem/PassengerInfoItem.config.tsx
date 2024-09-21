export interface Config {
  type: string;
  label?: string;
  key?: string;
  placeholder?: string;
  inputType?: string;
  optionsKey?: string;
  group?: string;
  slots?: boolean;
  checkbox?: string | boolean;
}

export interface ConfigGroup {
  step1: Config[];
  step2: { [key: string]: Config[] };
  step3: { [key: string]: Config[] };
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
      type: "typography",
      key: "ticket.[direction].baggage.count",
      optionsKey: "baggages",
      placeholder: "Выберите багаж",
    },
  ],

  step2: {
    full: [
      {
        type: "select",
        label: "Тип документа",
        key: "identification.document.type",
        optionsKey: "documents",
        placeholder: "Выберите скидку",
      },
      {
        type: "input",
        label: "Серия",
        key: "identification.document.series",
        placeholder: "-- --",
        group: "series-number",
      },
      {
        type: "input",
        label: "Номер",
        key: "identification.document.number",
        placeholder: "--- ---",
        group: "series-number",
      },
    ],
    discount: [
      {
        type: "chip",
        label: "",
        key: "ticket.[direction].discount.type",
        optionsKey: "main",
      },
    ],
    privilege: [
      {
        type: "select",
        label: "Тип льготы",
        key: "identification.privilege.type",
        optionsKey: "privileges",
        placeholder: "Выберите льготу",
      },
      {
        type: "input",
        label: "Серия",
        key: "identification.privilege.series",
        placeholder: "-- --",
        group: "privilege-series-number",
      },
      {
        type: "input",
        label: "Номер",
        key: "identification.privilege.number",
        placeholder: "--- ---",
        group: "privilege-series-number",
      },
      {
        type: "select",
        label: "Тип документа",
        key: "identification.document.type",
        optionsKey: "documents",
        placeholder: "Выберите документ",
      },
      {
        type: "input",
        label: "Серия",
        key: "identification.document.series",
        placeholder: "-- --",
        group: "document-series-number",
      },
      {
        type: "input",
        label: "Номер",
        key: "identification.document.number",
        placeholder: "--- ---",
        group: "document-series-number",
      },
    ],
    child: [
      {
        type: "chip",
        label: "",
        key: "ticket.[direction].discount.type",
        optionsKey: "child",
      },
      {
        type: "input",
        label: "Свидетельтво о рождении",
        key: "identification.child.number",
        placeholder: "Введите номер",
      },
    ],
  },

  step3: {
    student: [
      {
        type: "input",
        label: "Номер студенческого",
        key: "identification.student.number",
        placeholder: "Введите номер",
      },
    ],
    military: [
      {
        type: "input",
        label: "Номер справки",
        key: "identification.military.number",
        placeholder: "Введите номер",
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
      key: "phone.number",
      placeholder: "(---) --- -- --",
      optionsKey: "countries",
      slots: true,
      checkbox: "Отказ предоставления телефона",
    },
    {
      type: "radioGroup",
      label: "Пол",
      key: "gender",
      optionsKey: "genders",
    },
  ],
};
