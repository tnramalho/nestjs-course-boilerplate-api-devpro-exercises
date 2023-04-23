import { Inject, Injectable } from '@nestjs/common';
import { RepositoryToken } from '../../../shared/constants/repository-token';
import { BaseServiceInterface } from '../../../shared/interfaces/base-service.interface';
import { UpdateUserDto } from '../../controllers/dtos/update-user.dto';
import { UserRepositoryInterface } from '../entities/gateways/user-repository.interface';
import { User } from '../entities/User.entity';

@Injectable()
export class UserService implements BaseServiceInterface<User, string> {
  constructor(
    @Inject(RepositoryToken.USER)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  public async delete(id: string): Promise<string> {
    return this.userRepository.delete(id);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  public async update(id: string, user: UpdateUserDto): Promise<string> {
    return this.userRepository.update(id, user);
  }
}
