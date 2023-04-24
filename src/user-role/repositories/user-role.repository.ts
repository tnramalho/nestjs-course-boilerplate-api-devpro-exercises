import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleRepositoryInterface } from '../domain/entities/gateways/user-role-repository.interface';
import { UserRole } from '../domain/entities/user.role';

@Injectable()
export class UserRoleRepository implements UserRoleRepositoryInterface {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleDocument: Repository<UserRole>,
  ) {}

  public async create(data: UserRole): Promise<UserRole> {
    return this.userRoleDocument.save(data);
  }

  public async delete(id: string): Promise<string> {
    const userRoleToDelete = await this.findById(id);
    await this.userRoleDocument.delete(userRoleToDelete.id);
    return 'User role deleted successfully';
  }

  public async findAll(): Promise<UserRole[]> {
    return this.userRoleDocument.find();
  }

  public async findById(id: string): Promise<UserRole> {
    const userRole = await this.userRoleDocument.findOneBy({ id });
    if (!userRole) {
      throw new NotFoundException('User role not found');
    }
    return userRole;
  }

  public async update(id: string, data: Partial<UserRole>): Promise<string> {
    const userRoleToUpdate = await this.findById(id);
    await this.userRoleDocument.update(userRoleToUpdate.id, data);
    return 'User role updated successfully';
  }
}
