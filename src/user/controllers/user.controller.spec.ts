import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import {
  getCreateUserDto,
  getExpectedUsers,
  getUpdateUserDto,
  getUser,
} from '../../../test/shared/user-builder.spec';
import { User } from '../domain/entities/User.entity';
import { UserService } from '../domain/services/user.service';
import { UserMapper } from '../infrastructure/mappers/user.mapper';
import { UserRepository } from '../repositories/user-repository';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'UserRepositoryInterface',
          useClass: UserRepository,
        },
        UserMapper,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userService.create with createUserDto', () => {
      const createUserDto = getCreateUserDto();

      const expectedUser: User = {
        id: randomUUID(),
        name: createUserDto.name,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        age: createUserDto.age,
        username: createUserDto.username,
      };
      jest.spyOn(userService, 'create').mockReturnValue(expectedUser);
      const createdUser: User = controller.createUser(createUserDto);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(createdUser).toEqual(expectedUser);
    });
  });
  describe('findAllUsers', () => {
    it('should call userService.findAll', () => {
      const expectedUsers = getExpectedUsers();
      jest.spyOn(userService, 'findAll').mockReturnValue(expectedUsers);
      const foundUsers: User[] = controller.findAllUsers();
      expect(userService.findAll).toHaveBeenCalled();
      expect(foundUsers).toEqual(expectedUsers);
    });
  });

  describe('findUserById', () => {
    it('should return a user when given a valid UUID', () => {
      const user = getUser();
      jest.spyOn(userService, 'findOneById').mockReturnValue(user);

      const result = controller.findUserById(user.id);

      expect(userService.findOneById).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(user);
    });

    it('should throw a not found exception when the user does not exists', () => {
      const invalidUuid = '12345';

      expect(() => {
        controller.findUserById(invalidUuid);
      }).toThrowError('User not found');
    });
  });

  describe('updateUser', () => {
    it('should update a user', () => {
      const id = randomUUID();
      const updateUserDto = getUpdateUserDto();
      const updatedUser: User = { id, ...updateUserDto };

      jest.spyOn(userService, 'update').mockImplementation(() => updatedUser);

      expect(controller.updateUser(id, updateUserDto)).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', () => {
      const id = '1';

      jest
        .spyOn(userService, 'delete')
        .mockImplementation(() => 'User deleted successfully');

      expect(controller.deleteUser(id)).toEqual('User deleted successfully');
      expect(userService.delete).toHaveBeenCalledWith(id);
    });
  });
});
