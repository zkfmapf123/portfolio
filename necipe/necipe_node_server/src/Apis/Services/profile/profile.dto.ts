import { UserDto } from "../user/user.dto";

export type ProfileDto = UserDto & {
  imageUrl: string;
};
