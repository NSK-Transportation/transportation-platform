/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Baggage } from "@/entities/baggage";
import { Cashier } from "@/entities/cashier";
import { Discount } from "@/entities/discount";
import { Payment } from "@/entities/payment";
import { Refund } from "@/entities/refund";
import { Seat } from "@/entities/seat";
import { WayDetail } from "@/entities/wayDetails";
import { Options } from "@/shared/types/types";

// Enum билетов
export enum TicketType {
  FULL = "full",
  CHILD = "child",
  PRIVILEGE = "privilege",
  DISCOUNT = "discount",
}

// Интерфейс билета
export interface Ticket extends Options<TicketType, "type"> {
  seatId: Seat["id"] | null;
  wayDetail: WayDetail | null;
  discount?: Discount | null;
  baggage?: Baggage | null;
  payment: Payment | null;
  cashier: Cashier | null;
  saleDate: string;
  saleTime: string;
  refund?: Partial<Refund> | null;
}
