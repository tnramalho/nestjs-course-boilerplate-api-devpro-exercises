import { BaseRepositoryInterface } from '../../../../shared/interfaces/base-repository.interface';
import { Role } from '../role.entity';

export type RoleRepositoryInterface = BaseRepositoryInterface<Role, string>;
