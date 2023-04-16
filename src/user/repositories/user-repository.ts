import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/User';
import { UserRepositoryInterface } from '../gateways/user-repository.interface';

export class UserRepository implements UserRepositoryInterface {
  private readonly userDocument: User[];

  constructor() {
    this.userDocument = [];
  }

  public create(user: User): User {
    const usersEmails = this.findAll().map((user) => user.email);
    if (usersEmails.includes(user.email)) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Email already registered',
      });
    }
    user.setId();
    this.userDocument.push(user);
    return user;
  }

  public delete(id: string): string {
    const userIndex = this.userDocument.findIndex(
      (user) => user.getId() === id,
    );
    if (userIndex < 0) {
      throw new NotFoundException(userIndex, 'User not found');
    }
    this.userDocument.splice(userIndex, 1);
    return 'User deleted successfully';
  }

  public findAll(): User[] {
    const users = this.userDocument;
    return users.length === 0 ? Array.from(users) : users;
  }

  public findOneById(id: string): User {
    const user = this.userDocument.find((user) => user.getId() === id);
    if (!user) {
      throw new NotFoundException(user, 'User not found');
    }
    return user;
  }

  public update(id: string, user: Partial<User>): User {
    const userToUpdate = this.findOneById(id);
    Object.assign(userToUpdate, user);
    return userToUpdate;
  }
}
