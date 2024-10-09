import { Options } from "@/shared/types";

export type SeatStatus = "free" | "selected" | "booking" | "occupied";

export interface Seat extends Options<SeatStatus, "status"> {
  standing?: number;
  seated?: number;
  price: number;
  tariff: number;
  duty: number;
  saleDate: string;
  saleTime: string;
  whoSold: string;
}
