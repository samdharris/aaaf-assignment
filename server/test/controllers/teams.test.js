const server = require('../../src/server');
const supertest = require('supertest')(server);
const userSeeder = require('../../src/database/seeding/users.seeder');
const teamSeeder = require('../../src/database/seeding/teams.seeder');
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

describe('GET - /api/teams', () => {
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

    afterEach(() => {
        return mongoose.connection.dropCollection('teams');
    });

    it('should return all teams.', async () => {
        await teamSeeder.seed('Team A');

        const response = await supertest
            .get('/api/teams')
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(200);
        expect(response.body.teams).toHaveLength(1);
    });
});
