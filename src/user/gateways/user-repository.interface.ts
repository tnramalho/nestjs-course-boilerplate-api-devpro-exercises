import { User } from '../entities/User';

export interface UserRepositoryInterface {
  create(user: User): User;

  findAll(): User[];

  findOneById(id: string): User;

  delete(id: string): string;

  update(id: string, user: Partial<User>): User;
}
