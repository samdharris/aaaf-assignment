const server = require('../src/server');
const supertest = require('supertest')(server);
const userSeeder = require('../src/database/seeding/users.seeder');
const mongoose = require('mongoose');
const securityUtils = require('../src/securityUtils');
const User = require('../src/database/models/user.model');
require('dotenv').config();

beforeAll(() => {
    return mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-gui1q.mongodb.net/test?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
});

afterAll(() => {
    return mongoose.connection.dropCollection('users').then(() => {
        return mongoose.disconnect();
    });
});

describe('POST /login', () => {
    it('should authenticate and return a token', async () => {
        const user = await userSeeder.seed();
        const response = await supertest.post('/login').send({
            email: user.email,
            password: process.env.DUMMY_PASSWORD,
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should authenticate and return a valid token', async () => {
        const user = await userSeeder.seed();
        const response = await supertest.post('/login').send({
            email: user.email,
            password: process.env.DUMMY_PASSWORD,
        });
        expect(response.status).toBe(200);
        const decoded = securityUtils.validateToken(response.body.token);
        expect(decoded).toHaveProperty('id');
        expect(decoded.id).toBe(user.id);
    });

    it('should return an error if an unknown email address is passed', async () => {
        const user = await userSeeder.seed();
        const response = await supertest.post('/login').send({
            email: 'foney@tms.com',
            password: process.env.DUMMY_PASSWORD,
        });

        expect(response.status).toBe(400);
        expect(response.body.email).toEqual(
            expect.arrayContaining(["Email address doesn't match"])
        );
    });

    it('should return an error if an invalid password is provided', async () => {
        const user = await userSeeder.seed();
        const response = await supertest.post('/login').send({
            email: user.email,
            password: 'imafake43',
        });

        expect(response.status).toBe(400);
        expect(response.body.password).toEqual(
            expect.arrayContaining(['password is invalid'])
        );
    });

    it('should return an error if the user is disabled.', async () => {
        const user = await userSeeder.seed({
            enabled: false,
        });
        const response = await supertest.post('/login').send({
            email: user.email,
            password: process.env.DUMMY_PASSWORD,
        });

        expect(response.status).toBe(401);
        expect(response.body.email).toBe('User is disabled!');
    });
});
