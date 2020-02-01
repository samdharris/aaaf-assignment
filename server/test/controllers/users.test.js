const server = require('../../src/server');
const supertest = require('supertest')(server);
const userSeeder = require('../../src/database/seeding/users.seeder');
const mongoose = require('mongoose');
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
    return mongoose.disconnect();
});

afterEach(() => {
    return mongoose.connection.dropCollection('users');
});

describe('GET - /api/users', () => {
    let token = {};
    beforeAll(done => {
        userSeeder.seed().then(user => {
            supertest
                .post('/login')
                .send({
                    email: user.email,
                    password: process.env.DUMMY_PASSWORD,
                })
                .expect(200)
                .end((err, { body }) => {
                    token.value = body.token;
                    done(err);
                });
        });
    });

    it('should return a collection of all users', async () => {
        const users = [];

        for (let i = 0; i < 10; i++) {
            users.push(await userSeeder.seed());
        }

        const response = await supertest
            .get('/api/users')
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(200);
        expect(response.body.users).toHaveLength(11);
    });
});
