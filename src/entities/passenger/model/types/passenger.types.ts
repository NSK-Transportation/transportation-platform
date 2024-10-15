/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Ticket } from "@/entities/ticket";
import { Options } from "@/shared/types/types";

export type GenderType = "male" | "female";

export type Gender = Options<GenderType, "type">;

export enum PrivilegeType {
  STUDENT = "student",
  MILITARY = "military",
}

export interface Privilege extends Options<PrivilegeType, "type"> {
  series: string;
  number: string;
}

export enum DocumentType {
  PASSPORT = "passport",
  DRIVER = "driver",
}

export interface Document extends Options<DocumentType, "type"> {
  series: string;
  number: string;
}

export interface Identification {
  document: Partial<Document>;
  privilege: Partial<Privilege>;
  student: {
    number?: string;
  };
  military: {
    number?: string;
  };
  child: {
    series?: string;
    number?: string;
  };
}

export interface Phone {
  code: string;
  number: string;
  refusalToProvide: boolean;
}

export interface Passenger {
  readonly id: number | string;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: Gender;
  birthday: Date | null;
  phone: Phone;
  identification: Partial<Identification> | null;
  ticket: {
    there: Partial<Ticket> | null;
    return: Partial<Ticket> | null;
  };
}
