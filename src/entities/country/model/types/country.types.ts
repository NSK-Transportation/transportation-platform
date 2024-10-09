import { Options } from "@/shared/types";

export interface Country extends Options<string, "name"> {
  code: string;
  dialCode: string;
  flag: string;
}
