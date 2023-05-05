import { UserRoleInterface } from './user-role.interface';
export interface UserRoleCreatableInterface
  extends Pick<UserRoleInterface, 'userId' | 'roleId'> {}
