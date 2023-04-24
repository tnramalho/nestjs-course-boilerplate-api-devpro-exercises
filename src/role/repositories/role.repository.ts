import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepositoryInterface } from '../domain/entities/gateways/role-repository.interface';
import { Role } from '../domain/entities/role.entity';

@Injectable()
export class RoleRepository implements RoleRepositoryInterface {
  constructor(
    @InjectRepository(Role) private readonly roleDocument: Repository<Role>,
  ) {}
  public async create(data: Role): Promise<Role> {
    return this.roleDocument.save(data);
  }

  public async delete(id: string): Promise<string> {
    const roleToDelete = await this.findById(id);
    await this.roleDocument.delete(roleToDelete.id);
    return 'Role deleted successfully';
  }

  public async findAll(): Promise<Role[]> {
    return this.roleDocument.find();
  }

  public async findById(id: string): Promise<Role> {
    const role = await this.roleDocument.findOneBy({ id });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  public async update(id: string, data: Partial<Role>): Promise<string> {
    const roleToUpdate = await this.findById(id);
    await this.roleDocument.update(roleToUpdate.id, data);
    return 'Role updated successfully';
  }
}
