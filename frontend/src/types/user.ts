import { Role } from "./role";

export type User = {
  id: number;
  firstName: string;
  email: string;
  roles: Role[]
};
