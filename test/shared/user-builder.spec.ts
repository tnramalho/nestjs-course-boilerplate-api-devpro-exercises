import { randomUUID } from 'crypto';
import { User } from '../../src/user/domain/entities/User.entity';
import { CreateUserDtoInterface } from '../../src/user/interfaces/create-user-dto.interface';
import { UpdateUserDtoInterface } from '../../src/user/interfaces/update-user-dto.interface';

export const getCreateUserDto = (): CreateUserDtoInterface => {
  return {
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    age: 29,
    username: 'john_doe',
  };
};

export const getUpdateUserDto = (): UpdateUserDtoInterface => {
  return {
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    age: 29,
    username: 'john_doe',
  };
};
export const getUser = (): User => {
  return {
    id: randomUUID(),
    name: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    age: 29,
    username: 'john_doe',
  };
};

export const getExpectedUsers = (): User[] => {
  return [
    {
      id: randomUUID(),
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      age: 29,
      username: 'john_doe',
    },
    {
      id: randomUUID(),
      name: 'Jess',
      lastName: 'Smith',
      email: 'jess@example.com',
      age: 35,
      username: 'jess_smith',
    },
  ];
};
