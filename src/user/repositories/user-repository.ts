import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from '../domain/entities/gateways/user-repository.interface';
import { User } from '../domain/entities/User.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User) private readonly userDocument: Repository<User>,
  ) {}

  public async create(user: User): Promise<User> {
    return this.userDocument.save(user);
  }

  public async delete(id: string): Promise<string> {
    const userToDelete = await this.findById(id);
    await this.userDocument.delete(userToDelete.id);
    return 'User deleted successfully';
  }

  public async findAll(): Promise<User[]> {
    return this.userDocument.find({
      relations: ['userRoles'],
    });
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userDocument.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async update(id: string, user: Partial<User>): Promise<string> {
    const userToUpdate = await this.findById(id);
    await this.userDocument.update(userToUpdate.id, user);
    return 'User Updated Successfully';
  }
}
