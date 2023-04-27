import { NotFoundException } from '@nestjs/common';
import { mockRole, roleDto } from './test/mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { Role } from './role.entity';

describe('RoleService', () => {
  let service: RoleService;
  const inexistentId = '1186d418-b8c9-4290-98c3-2d2a2c67da10';

  const mockRoleService = {
    create: jest.fn().mockReturnValue(mockRole),
    save: jest.fn().mockResolvedValue(mockRole),
    find: jest.fn().mockResolvedValue([mockRole, mockRole]),
    findOneBy: jest.fn().mockResolvedValue(mockRole),
    remove: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleService,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  describe(RoleService.prototype.create, () => {
    it('should create a role and return it', async () => {
      const result = await service.create(roleDto);
      expect(result).toEqual(mockRole);
    });
  });

  describe(RoleService.prototype.findAll, () => {
    it('should return all roles', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockRole, mockRole]);
    });
  });

  describe(RoleService.prototype['findById'], () => {
    it('should find and return a role', async () => {
      const user = await service['findById'](mockRole.id);
      expect(user).toEqual(mockRole);
    });

    it('should throw a NotFoundException', async () => {
      mockRoleService.findOneBy.mockResolvedValueOnce(null);
      await expect(service['findById'](inexistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe(RoleService.prototype.findOne, () => {
    it('should find and return a role', async () => {
      const result = await service.findOne(mockRole.id);
      expect(result).toEqual(mockRole);
    });

    it('should throw a NotFoundException', async () => {
      mockRoleService.findOneBy.mockResolvedValueOnce(null);
      await expect(service.findOne(inexistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe(RoleService.prototype.remove, () => {
    it('should remove a userRole and return void', async () => {
      const result = await service.remove(mockRole.id);
      expect(result).toBeUndefined();
    });

    it('should throw a NotFoundException', async () => {
      mockRoleService.findOneBy.mockResolvedValueOnce(null);
      await expect(service.remove(inexistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe(RoleService.prototype.update, () => {
    it('should update role and return it', async () => {
      const result = await service.update(mockRole.id, { name: 'User' });
      expect(result).toEqual(mockRole);
    });
  });
});
