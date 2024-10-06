/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Baggage } from "@/entities/baggage";
import { Discount } from "@/entities/discount";
import { Location } from "@/entities/location";
import { Seat } from "@/entities/seat";
import { Vehicle } from "@/entities/vehicle";
import { Options } from "@/shared/types";

// export type WayDetailStatus = "sale" | "dispatched" | "closed" | "canceled" | "delayed" | "noSeats";

export type WayDetailStatus = Options<string, "name">;

export interface WayDetail {
  readonly id: number;
  wayNumber: string;
  whoArive: string;
  status: WayDetailStatus["name"];
  ticket: {
    price: number;
  };
  baggage: Baggage;
  discounts: Discount[];
  seats: Seat[];
  from: Location;
  to: Location;
  vehicle: Vehicle;
}
