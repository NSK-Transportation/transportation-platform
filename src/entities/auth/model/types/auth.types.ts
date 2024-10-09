// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { User } from "@/entities/user";

export interface Authorization extends Pick<User, "id"> {
  password: string;
}

export interface GetAuthResponse {
  accessToken: string;
  user: User;
}
