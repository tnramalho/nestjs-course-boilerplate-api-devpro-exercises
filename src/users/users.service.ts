import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptUtil } from '../common/utils/cyrpt.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  public async create(createUser: CreateUserDto): Promise<UserDto> {
    const user = this.repo.create(createUser);
    const dbUser = await this.repo.save(user);
    return plainToInstance(UserDto, dbUser);
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.repo.find({
      relations: ['userRoles.role'],
    });
    return plainToInstance(UserDto, users);
  }

  private async findById(id: string): Promise<User> {
    // Get without relationships
    // const user = await this.repo.findOneBy({
    //   id,
    // });
    const user = await this.repo.findOne({
      where: { id },
      relations: ['userRoles.role'],
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async findOne(id: string): Promise<UserDto> {
    const user = await this.findById(id);
    return plainToInstance(UserDto, user);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.findById(id);
    const newUser = {
      ...user,
      ...updateUserDto,
    };
    this.repo.save(newUser);
    return plainToInstance(UserDto, newUser);
  }

  async validateUserPassword(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.repo.findOne({
      where: {
        username,
      },
    });
    if (
      user &&
      (await CryptUtil.validatePassword(password, user.password, user.salt))
    ) {
      return plainToInstance(UserDto, user);
    } else {
      return null;
    }
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.repo.remove(user);
  }
}
