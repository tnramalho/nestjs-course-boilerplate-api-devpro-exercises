import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { getCreateUserDto } from './shared/user-builder.spec';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /user', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send(getCreateUserDto())
      .expect(201);

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1);
      });
  });
});
