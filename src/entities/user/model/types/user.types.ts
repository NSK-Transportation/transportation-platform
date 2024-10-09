/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Role } from "@/entities/role";

export interface User {
  readonly id: string;
  firstName: string;
  lastName: string;
  role: Role | null;
  avatarUrl: string;
}