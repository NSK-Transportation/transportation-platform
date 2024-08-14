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

// Типы скидок
export type DiscountType = "none" | "student" | "military" | "half" | "full";
// Интерфейс скидок
export interface Discount {
  id: number;
  type: DiscountType;
  rus: string;
}

// Типы билетов
export type TicketType = "full" | "child" | "privilege" | "discount";
// Интерфейс билета
export interface Ticket {
  id: number;
  type: TicketType;
  rus: string;
}

// Типы багажа
export type BaggageType = "none" | "small" | "big" | "huge";
// Интерфейс багажа
export interface Baggage {
  id: number;
  type: BaggageType;
  rus: string;
}

// Типы документов
export type DocumentType = "passport";
// Интерфейс документов
export interface Document {
  id: number;
  type: DocumentType;
  rus: string;
}

export interface Identification {
  series?: string;
  number?: string;
  documentType?: DocumentType;
}

// Интерфейс пассажира
export interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: "women" | "men" | null;
  birthday: string;
  phone: string;
  seatId: number;
  identification: Identification | null;
  ticket: Ticket | null;
  baggage: Baggage | null;
  discount: Discount | null;
  payment: Payment | null;
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
