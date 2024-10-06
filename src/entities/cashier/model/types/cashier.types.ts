/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Role } from "@/entities/role";
import { User } from "@/entities/user";

export type Cashier = User<Role.CASHIER>;
