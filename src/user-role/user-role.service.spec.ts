import { NotFoundException } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { mockCreateUserRole, createUserRoleDto } from './test/mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { UserRoleService } from './user-role.service';

describe('UserRoleService', () => {
  let service: UserRoleService;
  const inexistentId = '1186d418-b8c9-4290-98c3-2d2a2c67da10';

  const mockUserRoleService = {
    create: jest.fn().mockReturnValue(mockCreateUserRole),
    save: jest.fn().mockResolvedValue(mockCreateUserRole),
    find: jest.fn().mockResolvedValue([mockCreateUserRole, mockCreateUserRole]),
    findOneBy: jest.fn().mockResolvedValue(mockCreateUserRole),
    remove: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleService,
        {
          provide: getRepositoryToken(UserRole),
          useValue: mockUserRoleService,
        },
      ],
    }).compile();

    service = module.get<UserRoleService>(UserRoleService);
  });

  describe(UserRoleService.prototype.create, () => {
    it('should create a userRole and return it', async () => {
      const result = await service.create(createUserRoleDto);
      expect(result).toEqual(mockCreateUserRole);
    });
  });

  describe(UserRoleService.prototype.findAll, () => {
    it('should return all userRoles', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockCreateUserRole, mockCreateUserRole]);
    });
  });

  describe(UserRoleService.prototype['findById'], () => {
    it('should find and return a userRole', async () => {
      const user = await service['findById'](mockCreateUserRole.id);
      expect(user).toEqual(mockCreateUserRole);
    });

    it('should throw a NotFoundException', async () => {
      mockUserRoleService.findOneBy.mockResolvedValueOnce(null);
      await expect(service['findById'](inexistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe(UserRoleService.prototype.findOne, () => {
    it('should find and return a userRole', async () => {
      const result = await service.findOne(mockCreateUserRole.id);
      expect(result).toEqual(mockCreateUserRole);
    });

    it('should throw a NotFoundException', async () => {
      mockUserRoleService.findOneBy.mockResolvedValueOnce(null);
      await expect(service.findOne(inexistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe(UserRoleService.prototype.remove, () => {
    it('should remove a userRole and return void', async () => {
      const result = await service.remove(mockCreateUserRole.id);
      expect(result).toBeUndefined();
    });

    it('should throw a NotFoundException', async () => {
      mockUserRoleService.findOneBy.mockResolvedValueOnce(null);
      await expect(service.remove(inexistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
