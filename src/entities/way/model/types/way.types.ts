/* eslint-disable @conarti/feature-sliced/layers-slices */
import { City } from "@/entities/city";
import { Station } from "@/entities/station";

export interface Way {
  date: Date | null;
  from: {
    city: City | null;
    station: Station | null;
  };
  to: {
    city: City | null;
    station: Station | null;
  };
}
