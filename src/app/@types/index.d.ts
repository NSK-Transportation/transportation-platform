// Типы статусов мест
export type SeatStatus = "free" | "selected" | "booking" | "occupied";
// Интерфейс мест
export interface Seat {
  id: number;
  status: SeatStatus;
}

// Интерфейс статусов
export interface Status {
  id: number;
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
  id: number;
  wayNumber: string;
  whoArive: string;
  price: number;
  seatsSelected: number[];
  seats: Seat[];
  from: Location;
  to: Location;
}

// Типы оплаты
export type PaymentType = "cash" | "card" | "qr";
// Интерфейс оплаты
export interface Payment {
  id: number;
  type: PaymentType;
  rus: string;
}

// Типы причин возврата
export type RefundReasonType = "delay";
// Интерфейс причины возврата
export interface RefundReason {
  id: number;
  type: RefundReasonType;
  rus: string;
}

// Типы скидок
export type DiscountType = "none" | "student" | "military" | "half" | "full";
// Интерфейс скидок
export interface Discount {
  id: number;
  type: DiscountType;
  value: number;
  rus: string;
}

// Интерфейс кассира
export interface Cashier {
  id: number;
  name: string;
}

// Интерфейс кассы
export interface CashRegister {
  id: number;
  location: string;
  number: string;
}

// Типы билетов
export type TicketType = "full" | "child" | "privilege" | "discount";
// Интерфейс билета
export interface Ticket {
  id: number;
  type: TicketType | "";
  rus: string;
  seatId?: number;
  identification?: Identification | null;
  wayDetails?: WayDetails | null;
  discount?: Discount | null;
  baggage?: Baggage | null;
  payment?: Payment | null;
  cashier?: Cashier | null;
  cashRegister?: CashRegister | null;
  saleDate?: string;
  saleTime?: string;
  refund?: Partial<RefundReason> | null;
}

// Типы багажа
export type BaggageType = "none" | "small" | "big" | "huge";
// Интерфейс багажа
export interface Baggage {
  id: number;
  type: BaggageType;
  rus: string;
}

// Типы льгот
export type PrivilegeType = "none" | "student" | "military" | "half" | "full";
// Интерфейс льгот
export interface Privilege {
  id: number;
  type: PrivilegeType;
  rus: string;
}

// Типы документов
export type DocumentType = "passport" | "driver" | "student" | "military";
// Интерфейс документов
export interface Document {
  id: number;
  type: DocumentType;
  rus: string;
}

export interface Identification {
  // TODO: Переделать
  series?: string;
  number?: string;
  document?: Document;
  privilege?: Privilege;
  studentTicketNumber?: string;
  militaryCertificateNumber?: string;
  birthCertificateSeries?: string;
  birthCertificateNumber?: string;
}

// Интерфейс пассажира
export interface Passenger {
  readonly id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: "women" | "men" | null;
  birthday: string;
  phone: string;
  identification: Identification | null;
  ticket: Partial<Ticket>;
}

// Интерфейс маршрута
export interface Way {
  date: string;
  from: string;
  to: string;
}
// Интерфейс информации маршрута
export interface WayMenu {
  returnHave: boolean;
  return: Way;
  to: Way;
}
