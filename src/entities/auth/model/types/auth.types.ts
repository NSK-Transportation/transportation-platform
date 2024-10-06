// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { User } from "@/entities/user";

// Интерфейс авторизации
export interface Authorization extends Pick<User, "id"> {
  password: string;
}
