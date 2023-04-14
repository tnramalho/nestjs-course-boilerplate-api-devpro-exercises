import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/User';
import { UserRepositoryInterface } from '../gateways/user-repository.interface';
import { UserServiceInterface } from '../shared/interfaces/user-service.interface';
import { UserMapper } from '../shared/mappers/user.mapper';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private userMapper: UserMapper,
  ) {}

  public create(user: CreateUserDto): User {
    return this.userRepository.create(
      this.userMapper.mapCreateUserDtoToUser(user),
    );
  }

  public delete(id: string): string {
    return this.userRepository.delete(id);
  }

  public findAll(): User[] {
    return this.userRepository.findAll();
  }

  public findOneById(id: string): User {
    return this.userRepository.findOneById(id);
  }

  public update(id: string, user: UpdateUserDto): User {
    return this.userRepository.update(id, user);
  }
}
