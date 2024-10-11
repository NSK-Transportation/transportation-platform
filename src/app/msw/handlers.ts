import { authHandlers } from "@/entities/auth";
import { wayHandlers } from "@/entities/way";

export const handlers = [...authHandlers, ...wayHandlers];
