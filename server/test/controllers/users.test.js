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
                    token.user = user;
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

describe('GET - /api/users/{id}', () => {
    let token = {};
    beforeEach(done => {
        userSeeder.seed().then(user => {
            token.user = user;
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

    it('should return the requested user', async () => {
        const response = await supertest
            .get(`/api/users/${token.user._id}`)
            .set('Authorization', `bearer ${token.value}`);
        expect(response.body.user._id).toBe(token.user._id.toString());
    });

    it('should return a 404 if it cannot find the requested user', async () => {
        const invalid = '5e3017f16302c04392cbec7b';
        const response = await supertest
            .get(`/api/users/${invalid}`)
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(404);
    });
});

describe('POST - /api/users', () => {
    let token = {};
    beforeEach(done => {
        userSeeder.seed().then(user => {
            token.user = user;
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

    it('should create a user', async () => {
        const user = {
            name: 'Bob Fred',
            email: 'bobfred@tms.com',
            password: process.env.DUMMY_PASSWORD,
        };

        const response = await supertest
            .post('/api/users')
            .send(user)
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(201);
        delete user.password;
        expect(response.body.user).toEqual(expect.objectContaining(user));
    });
});

describe('PUT - /api/users/{id}', () => {
    let token = {};
    beforeEach(done => {
        userSeeder.seed().then(user => {
            token.user = user;
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

    it('should update a user', async () => {
        const updated = { name: 'Bob Fred', email: 'bobfred@tms.com' };

        const response = await supertest
            .put(`/api/users/${token.user._id}`)
            .send(updated)
            .set('Authorization', `bearer ${token.value}`);
        expect(response.body.user).toEqual(expect.objectContaining(updated));
    });
});

describe('PUT - /api/users/{id}/enable', () => {
    let token = {};
    beforeEach(done => {
        userSeeder.seed().then(user => {
            token.user = user;
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

    it('should enable a user', async () => {
        await supertest
            .put(`/api/users/${token.user._id}/enable`)
            .set('Authorization', `bearer ${token.value}`);
        const response = await supertest
            .get(`/api/users/${token.user._id}`)
            .set('Authorization', `bearer ${token.value}`);
        expect(response.status).toBe(200);
        expect(response.body.user.enabled).toBeTruthy();
    });
});

describe('PUT - /api/users/{id}/disable', () => {
    let token = {};
    beforeEach(done => {
        userSeeder.seed().then(user => {
            token.user = user;
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

    it('should disable a user', async () => {
        await supertest
            .put(`/api/users/${token.user._id}/disable`)
            .set('Authorization', `bearer ${token.value}`);
        const response = await supertest
            .get(`/api/users/${token.user._id}`)
            .set('Authorization', `bearer ${token.value}`);

        /**
         * you cannot view a given user if they're disabled
         */
        expect(response.status).toBe(401);
    });
});

describe('DELETE - /api/users/{id}', () => {
    let token = {};
    beforeEach(done => {
        userSeeder.seed().then(user => {
            token.user = user;
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

    it('should delete a given user', async () => {
        const response = await supertest
            .delete(`/api/users/${token.user._id}`)
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(204);
    });
});
