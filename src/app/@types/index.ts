// Интерфейс авторизации
export interface Authorization {
  readonly userID: string;
  password: string;
}

// Типы статусов мест
export type SeatStatus = "free" | "selected" | "booking" | "occupied";
// Интерфейс мест
export interface Seat {
  readonly id: number;
  status: SeatStatus;
}

// Интерфейс статусов
export interface Status {
  readonly id: number;
  status: SeatStatus;
  rus: string;
}

// Интерфейс локации (откуда - куда)
export interface Location {
  city: string;
  street: string;
  house: string;
  station: string;
  time: string;
  date: string;
}

// Интерфейс детализации информации маршрута
export interface WayDetails {
  readonly id: number;
  wayNumber: string;
  whoArive: string;
  price: number;
  seatsSelected: number[];
  seats: Seat[];
  from: Location;
  to: Location;
}

// Enum оплаты
export enum PaymentType {
  CASH = "cash",
  CARD = "card",
  QRCODE = "qrcode",
}
// Интерфейс оплаты
export interface Payment {
  readonly id: number;
  type: PaymentType;
  rus: string;
}

// Типы возврата
export type RefundType = "delay";
// Интерфейс возврата
export interface Refund {
  readonly id: number;
  type: RefundType;
  rus: string;
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
export interface Discount {
  readonly id: number;
  type: DiscountType;
  value: number;
  rus: string;
}

// Интерфейс кассира
export interface Cashier {
  readonly id: number;
  name: string;
}

// Интерфейс кассы
export interface CashRegister {
  readonly id: number;
  location: string;
  number: string;
}

// Enum билетов
export enum TicketType {
  FULL = "full",
  CHILD = "child",
  PRIVILEGE = "privilege",
  DISCOUNT = "discount",
}

// Интерфейс билета
export interface Ticket {
  readonly id: number;
  type: TicketType;
  rus: string;
  seatId: number;
  identification: Identification | null;
  wayDetails: WayDetails | null;
  discount?: Discount | null;
  baggage?: Baggage | null;
  payment: Payment | null;
  cashier: Cashier | null;
  cashRegister: CashRegister | null;
  saleDate: string;
  saleTime: string;
  refund?: Partial<Refund> | null;
}

// Enum багажа
export enum BaggageType {
  NONE = "none",
  SMALL = "small",
  BIG = "big",
  HUGE = "huge",
}
// Интерфейс багажа
export interface Baggage {
  id: number;
  type: BaggageType;
  rus: string;
}

// Enum льгот
export enum PrivilegeType {
  NONE = "none",
  STUDENT = "student",
  MILITARY = "military",
}
// Интерфейс льгот
export interface Privilege {
  readonly id: number;
  type: PrivilegeType;
  rus: string;
}

// Enum документов
export enum DocumentType {
  NONE = "none",
  PASSPORT = "passport",
  DRIVER = "driver",
}
// Интерфейс документов
export interface Document {
  readonly id: number;
  type: DocumentType;
  rus: string;
}

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
export interface Gender {
  readonly id: number;
  type: GenderType;
  rus: string;
}

// Интерфейс пассажира
export interface Passenger {
  readonly id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: Gender | null;
  birthday: string;
  phone: string;
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
  from: string;
  to: string;
}
// Интерфейс информации маршрута
export interface WayMenu {
  remoteSale: boolean;
  returnHave: boolean;
  return: Way;
  there: Way;
}
