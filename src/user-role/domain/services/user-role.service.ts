import { Inject, Injectable } from '@nestjs/common';
import { RepositoryToken } from '../../../shared/constants/repository-token';
import { BaseServiceInterface } from '../../../shared/interfaces/base-service.interface';
import { UserRoleRepositoryInterface } from '../entities/gateways/user-role-repository.interface';
import { UserRole } from '../entities/user.role';

@Injectable()
export class UserRoleService implements BaseServiceInterface<UserRole, string> {
  constructor(
    @Inject(RepositoryToken.USER_ROLE)
    private readonly userRoleRepository: UserRoleRepositoryInterface,
  ) {}

  public async create(data: UserRole): Promise<UserRole> {
    return this.userRoleRepository.create(data);
  }

  public async delete(id: string): Promise<string> {
    return this.userRoleRepository.delete(id);
  }

  public async findAll(): Promise<UserRole[]> {
    return this.userRoleRepository.findAll();
  }

  public async findById(id: string): Promise<UserRole> {
    return this.userRoleRepository.findById(id);
  }

  public async update(id: string, data: Partial<UserRole>): Promise<string> {
    return this.userRoleRepository.update(id, data);
  }
}
