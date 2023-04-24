import { Inject, Injectable } from '@nestjs/common';
import { RepositoryToken } from '../../../shared/constants/repository-token';
import { BaseServiceInterface } from '../../../shared/interfaces/base-service.interface';
import { RoleRepositoryInterface } from '../entities/gateways/role-repository.interface';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService implements BaseServiceInterface<Role, string> {
  constructor(
    @Inject(RepositoryToken.ROLE)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}
  public async create(data: Role): Promise<Role> {
    return this.roleRepository.create(data);
  }

  public async delete(id: string): Promise<string> {
    return this.roleRepository.delete(id);
  }

  public async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  public async findById(id: string): Promise<Role> {
    return this.roleRepository.findById(id);
  }

  public async update(id: string, data: Partial<Role>): Promise<string> {
    return this.roleRepository.update(id, data);
  }
}
