/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Role } from "@/entities/role";

export interface User<T extends Role> {
  readonly id: string;
  firstName: string;
  lastName: string;
  role: T;
}
