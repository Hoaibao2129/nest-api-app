import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module'; // Update this path if necessary

describe('UserController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create a user', async () => {
        const createUserDto = {
            name: 'John Doe',
            email: 'john.doe@example.com',
        };

        const response = await request(app.getHttpServer())
            .post('/users') // Adjust the endpoint based on your route
            .send(createUserDto)
            .expect(201); // Expecting a 201 Created status

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(createUserDto.name);
        expect(response.body.email).toBe(createUserDto.email);
    });
});
