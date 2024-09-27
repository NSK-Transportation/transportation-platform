// Enum ролей
export enum Role {
  ADMIN,
  CASHIER,
  DISPATCHER,
}

// Интерфейс пользователя
export interface User {
  readonly id: string;
  firstName: string;
  lastName: string;
  role: Role;
}

// Интерфейс авторизации
export interface Authorization extends Pick<User, "id"> {
  password: string;
}

export type Options<T, K extends string> = {
  [key in K]: T;
} & {
  readonly id: number;
  rus?: string;
};

export interface Country extends Options<string, "name"> {
  code: string;
  dialCode: string;
  flag: string;
}

export interface City extends Options<string, "name"> {
  stations: Station[];
}

export interface Station extends Options<string, "name"> {}

// Типы статусов мест
export type SeatStatus = "free" | "selected" | "booking" | "occupied";
// Интерфейс мест
export interface Seat extends Options<SeatStatus, "status"> {}

// Интерфейс статусов
export interface Status extends Options<SeatStatus, "status"> {}

// Интерфейс локации (откуда - куда)
export interface Location {
  city: City;
  street: string;
  house: string;
  station: Station;
  time: string;
  date: string;
}
// Типы статусов мест
export type WayDetailStatus = "sale" | "dispatched" | "closed" | "canceled" | "delayed" | "noSeats";
// Интерфейс детализации информации маршрута
export interface WayDetail {
  readonly id: number;
  wayNumber: string;
  whoArive: string;
  status: WayDetailStatus;
  ticket: {
    price: number;
  };
  baggage: {
    price: number;
    count: number;
  };
  discounts: Discount[];
  seats: Seat[];
  from: Location;
  to: Location;
  bus: Bus;
}
export interface Bus {
  id: number;
  occupied: number;
  free: number;
  Number: string;
  driver: string;
  nameBus: string;
  atp: string;
  Bus: string;
  standPlace: number;
  bagPlace: number;
}

// Enum оплаты
export enum PaymentType {
  CASH = "cash",
  CARD = "card",
  SBP = "sbp",
}
// Интерфейс оплаты
export interface Payment extends Options<PaymentType, "type"> {
  amount?: number;
}

// Типы возврата
export type RefundType = "delay";
// Интерфейс возврата

export interface Refund extends Options<RefundType, "type"> {
  amount?: number;
}

// Enum скидок
export enum DiscountType {
  NONE = "none",
  STUDENT = "student",
  MILITARY = "military",
  HALF = "half",
  FULL = "full",
}
// Интерфейс скидок
export interface Discount extends Options<DiscountType, "type"> {
  value: number;
}

// Интерфейс кассира
export interface Cashier extends User {}

// Enum билетов
export enum TicketType {
  FULL = "full",
  CHILD = "child",
  PRIVILEGE = "privilege",
  DISCOUNT = "discount",
}

// Интерфейс билета
export interface Ticket extends Options<TicketType, "type"> {
  seatId: number | null;
  identification: Identification | null;
  wayDetail: WayDetail | null;
  discount?: Discount | null;
  baggage?: Baggage | null;
  payment: Payment | null;
  cashier: Cashier | null;
  saleDate: string;
  saleTime: string;
  refund?: Partial<Refund> | null;
}

// Интерфейс багажа
export interface Baggage {
  count: number;
  price: number;
}

// Enum льгот
export enum PrivilegeType {
  NONE = "none",
  STUDENT = "student",
  MILITARY = "military",
}
// Интерфейс льгот
export interface Privilege extends Options<PrivilegeType, "type"> {}

// Enum документов
export enum DocumentType {
  NONE = "none",
  PASSPORT = "passport",
  DRIVER = "driver",
}
// Интерфейс документов
export interface Document extends Options<DocumentType, "type"> {}

export interface Identification {
  document?: Document & {
    series: string;
    number: string;
  };
  privilege?: Privilege & {
    series: string;
    number: string;
  };
  student?: {
    number: string;
  };
  military?: {
    number: string;
  };
  child?: {
    number: string;
  };
}

// Enum гендеров
export enum GenderType {
  NONE = "none",
  MALE = "male",
  FEMALE = "female",
}
// Интерфейс гендеров
export interface Gender extends Options<GenderType, "type"> {}

// Интерфейс пассажира
export interface Passenger {
  readonly id: number | string;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: Gender | null;
  birthday: string;
  phone: {
    code: string;
    number: string;
    refusalToProvide: boolean;
  };
  identification: Identification | null;
  ticket: {
    there: Partial<Ticket> | null;
    return: Partial<Ticket> | null;
  };
}

// Интерфейс пути
export type Direction = "there" | "return";

// Интерфейс маршрута
export interface Way {
  date: string;
  from: {
    city: City["name"];
    station: Station["name"];
  };
  to: {
    city: City["name"];
    station: Station["name"];
  };
}
// Интерфейс информации маршрута
export interface WayMenu {
  remoteSale: boolean;
  returnHave: boolean;
  return: Way;
  there: Way;
}
