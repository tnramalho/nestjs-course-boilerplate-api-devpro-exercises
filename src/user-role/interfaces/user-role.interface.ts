import { CommonEntityInterface } from './../../common/interfaces/common-entity.interface';

export interface UserRoleInterface extends CommonEntityInterface {
  userId: string;
  roleId: string;
}
