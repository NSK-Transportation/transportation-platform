export const LinkData: { [key: string]: { text: string; to: string }[] } = {
  cashier: [
    // TODO: Изменить / пути на соответствующие названию
    { to: "/1", text: "Продажа билетов" },
    { to: "/2", text: "Возврат билетов" },
  ],
  dispatcher: [{ to: "/3", text: "Управление рейсами" }],
  administrator: [
    { to: "/4", text: "Автовокзал" },
    { to: "/5", text: "Права доступа" },
  ],
  reporting: [{ to: "/6", text: "Отчёты" }],
  reference: [{ to: "/7", text: "Справочная" }],
};

export const roleNames: { [key: string]: string } = {
  cashier: "Кассир",
  dispatcher: "Диспетчер",
  administrator: "Администратор",
  reporting: "Модуль отчётности",
  reference: "Справочная",
};
