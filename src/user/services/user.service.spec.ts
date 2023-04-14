import { Test, TestingModule } from '@nestjs/testing';
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
});
