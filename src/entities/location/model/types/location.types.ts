/* eslint-disable @conarti/feature-sliced/layers-slices */
import { City } from "@/entities/city";
import { Station } from "@/entities/station";

export interface Location {
  city: City;
  street: string;
  house: string;
  station: Station;
  time: string;
  date: string;
}
