import { BaseRepositoryInterface } from '../../../../shared/interfaces/base-repository.interface';
import { UserRole } from '../user.role';

export type UserRoleRepositoryInterface = BaseRepositoryInterface<
  UserRole,
  string
>;
