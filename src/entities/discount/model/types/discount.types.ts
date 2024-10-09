import { Options } from "@/shared/types";

export enum DiscountType {
  STUDENT = "student",
  MILITARY = "military",
  HALF = "half",
  FULL = "full",
}

export type Discount = Options<DiscountType, "type">;
