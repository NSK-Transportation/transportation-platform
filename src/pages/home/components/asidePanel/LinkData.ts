export function LinkData() {
  return {
    cashier: [
      { to: "/", text: "Продажа билетов" },
      { to: "/", text: "Возврат билетов" },
    ],
    dispatcher: [{ to: "/", text: "Управление рейсами" }],
    administrator: [
      { to: "/", text: "Автовокзал" },
      { to: "/", text: "Права доступа" },
    ],
    reporting: [{ to: "/", text: "Отчёты" }],
    reference: [{ to: "/", text: "Справочная" }],
  };
}

export const roleNames: { [key: string]: string } = {
  cashier: "Кассир",
  dispatcher: "Диспетчер",
  administrator: "Администратор",
  reporting: "Модуль отчётности",
  reference: "Справочная",
};
