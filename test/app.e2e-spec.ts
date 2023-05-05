import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let roleId;
  let userId;
  describe('Role', () => {
    let data;
    const name = 'e2e Role test6';
    it('POST /roles', async () => {
      data = await request(app.getHttpServer())
        .post('/roles')
        .send({ name })
        .expect(201);
      data = JSON.parse(data.text);
      roleId = data['id'];
      expect(data).toMatchObject({ name, id: roleId });
    });
    it('GET /roles', async () => {
      const response = await request(app.getHttpServer())
        .get('/roles')
        .expect(200);
      const find = response.body.find((obj) => obj.id === roleId);
      expect(find).toBeDefined();
    });

    it('GET /roles/:id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/roles/${roleId}`)
        .expect(200);
      expect(response.body).toMatchObject({ name, id: roleId });
    });

    it('PATCH /roles/:id', async () => {
      const name = 'Ismael';
      const response = await request(app.getHttpServer())
        .patch(`/roles/${roleId}`)
        .send({ name })
        .expect(200);
      expect(response.body).toMatchObject({ id: roleId, name });
    });
  });

  describe('Users', () => {
    let data;
    const user = {
      username: 'Jixsx',
      firstName: 'Jirimn',
      lastName: 'Coelho',
      email: 'jirimn@gmail.com',
      password: 'sA109283',
    };
    it('POST /users', async () => {
      data = await request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201);
      data = JSON.parse(data.text);
      userId = data['id'];
      delete user.password;
      expect(data).toMatchObject(user);
    });

    it('GET /users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
      const find = response.body.find((obj) => obj.id === userId);
      expect(find).toBeDefined();
    });

    it('GET /users/:id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);
      expect(response.body).toMatchObject(user);
    });

    it('PATCH /users/:id', async () => {
      const name = 'Ismael';
      const response = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send({ name })
        .expect(200);
      expect(response.body).toMatchObject({ ...user, name });
    });
  });

  describe('UserRole', () => {
    let id;
    let data;
    it('POST /user-role', async () => {
      data = await request(app.getHttpServer())
        .post('/user-role')
        .send({ userId, roleId })
        .expect(201);
      data = JSON.parse(data.text);
      id = data['id'];
      expect(data).toMatchObject({ roleId, userId, id });
    });

    it('GET /user-role', async () => {
      const response = await request(app.getHttpServer())
        .get('/user-role')
        .expect(200);
      const find = response.body.find((obj) => obj.id === id);
      expect(find).toBeDefined();
    });

    it('GET /user-role/:id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/user-role/${id}`)
        .expect(200);
      expect(response.body).toMatchObject({ roleId, userId, id });
    });

    it('DELETE /user-role', async () => {
      await request(app.getHttpServer()).delete(`/user-role/${id}`).expect(204);
    });
  });

  describe('DELETE', () => {
    it('DELETE /roles/:id', async () => {
      await request(app.getHttpServer()).delete(`/roles/${roleId}`).expect(204);
    });

    it('DELETE /users/:id', async () => {
      await request(app.getHttpServer()).delete(`/users/${userId}`).expect(204);
    });
  });
});
