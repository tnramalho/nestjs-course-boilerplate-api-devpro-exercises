import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { User } from '../../entities/User';

export interface UserServiceInterface {
  create(user: CreateUserDto): User;

  findAll(): User[];

  findOneById(id: string): User;

  delete(id: string): string;

  update(id: string, user: UpdateUserDto): User;
}
