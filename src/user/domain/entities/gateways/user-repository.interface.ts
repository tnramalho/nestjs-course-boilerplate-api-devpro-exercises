import { BaseRepositoryInterface } from '../../../../shared/interfaces/base-repository.interface';
import { User } from '../User.entity';

export type UserRepositoryInterface = BaseRepositoryInterface<User, string>;
