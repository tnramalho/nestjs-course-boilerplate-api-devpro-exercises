import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Builder } from 'builder-pattern';
import { getCreateUserDto } from '../../../test/shared/user-builder.spec';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repositories/user-repository';
import { UserMapper } from '../shared/mappers/user.mapper';
import { UserService } from './user.service';

describe('User', () => {
  let provider: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepositoryInterface',
          useClass: UserRepository,
        },
        UserMapper,
      ],
    }).compile();

    provider = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe(UserService.prototype.create, () => {
    it('Should create a new user successfully', () => {
      const newUser = provider.create(getCreateUserDto());

      expect(newUser.id).toBeDefined();
      expect(newUser.username).toBe(getCreateUserDto().username);
    });
  });

  describe(UserService.prototype.findAll, () => {
    it('Should return a list of users', () => {
      const users = provider.findAll();

      expect(users.length).toBe(0);
    });
  });

  describe(UserService.prototype.delete, () => {
    it('Should delete user successfully', () => {
      const newUser = provider.create(getCreateUserDto());
      const foundUser = provider.findOneById(newUser.id);

      expect(foundUser.id).toBeDefined();

      provider.delete(foundUser.id);

      const ensureUserDeleted = () => {
        provider.findOneById(foundUser.id);
      };
      expect(ensureUserDeleted).toThrow(NotFoundException);
    });

    it('Should throw an error if user is not found', () => {
      const nullUserId = '';

      const isUserExists = () => {
        provider.findOneById(nullUserId);
      };
      expect(isUserExists).toThrow(NotFoundException);
    });
  });

  describe(UserService.prototype.findOneById, () => {
    it('Should return a user by his Id successfully', () => {
      const newUser = provider.create(getCreateUserDto());
      const user = provider.findOneById(newUser.id);

      expect(user.id).toBeDefined();
      expect(user.id).toBe(newUser.id);
      expect(user.username).toBe(newUser.username);
    });
    it('Should throw an error if user is not found', () => {
      const nullUserId = '';

      const isUserExists = () => {
        provider.findOneById(nullUserId);
      };
      expect(isUserExists).toThrow(NotFoundException);
    });
  });

  describe(UserService.prototype.update, () => {
    it('Should update an user successfully', () => {
      const newUser = provider.create(getCreateUserDto());
      const userToUpdate = Builder(UpdateUserDto)
        .username('Updated name')
        .build();
      const updatedUser = provider.update(newUser.id, userToUpdate);

      expect(newUser.id).toBeDefined();
      expect(updatedUser.id).toBeDefined();
      expect(newUser.id).toEqual(updatedUser.id);
      expect(userToUpdate.username).toEqual(updatedUser.username);
    });
  });
});
