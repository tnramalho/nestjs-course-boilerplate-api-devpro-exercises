import { UserRoleInterface } from './../../user-role/interfaces/user-role.interface';

export interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  salt: string;
  active: boolean;
  email: string;
  userRoles?: UserRoleInterface[];
}
