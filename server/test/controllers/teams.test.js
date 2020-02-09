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

afterEach(() => {
    return mongoose.connection.dropCollection('teams');
});

afterAll(() => {
    return mongoose.disconnect();
});

describe('GET - /api/teams', () => {
    let token = {};
    beforeAll(done => {
        userSeeder.seed({ isAdmin: true }).then(user => {
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

    it('should return all teams.', async () => {
        await teamSeeder.seed('Team A');

        const response = await supertest
            .get('/api/teams')
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(200);
        expect(response.body.teams).toHaveLength(1);
    });
});

describe('GET - /api/teams/{:id}', () => {
    let token = {};
    beforeAll(done => {
        userSeeder
            .seed({
                isAdmin: true,
            })
            .then(user => {
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

    it('should throw a 404 if it cannot find the requested team', async () => {
        const team = await teamSeeder.seed('Team A');

        const wrongId = '5e3017f16302c04392cbec7b';
        const response = await supertest
            .get(`/api/teams/${wrongId}`)
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(404);
    });

    it("should not allow you to view a given team if the current user isn't a member", async () => {
        const team = await teamSeeder.seed('Team A');

        const response = await supertest
            .get(`/api/teams/${team._id}`)
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(403);
    });

    it('should return the requested team', async () => {
        const team = await teamSeeder.seed('Team A');

        await supertest
            .post(`/api/teams/${team._id}/members`)
            .send({
                member: token.user._id,
            })
            .set('Authorization', `bearer ${token.value}`);

        const response = await supertest
            .get(`/api/teams/${team._id}`)
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('team');
        const { _id } = response.body.team;
        expect(_id.toString()).toBe(team._id.toString());
    });
});

describe('POST - /api/teams', () => {
    const token = {};
    beforeAll(done => {
        userSeeder
            .seed({
                isAdmin: true,
            })
            .then(user => {
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

    it('should successfully create a team', async () => {
        const teamName = 'Team A';
        const response = await supertest
            .post('/api/teams')
            .send({
                name: teamName,
            })
            .set('Authorization', `bearer ${token.value}`);

        expect(response.status).toBe(201);
        expect(response.body.team.name).toBe(teamName);
    });
});

describe('PUT - /api/teams/{teamId}', () => {
    const token = {};
    beforeAll(done => {
        userSeeder
            .seed({
                isAdmin: true,
            })
            .then(user => {
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

    it('should update the request user', async () => {
        const team = await teamSeeder.seed('Team A');
        const updatedName = 'Team AA';

        const response = await supertest
            .put(`/api/teams/${team._id}`)
            .send({
                name: updatedName,
            })
            .set('Authorization', `bearer ${token.value}`);

        expect(response.body.team.name).toBe(updatedName);
    });
});

describe('POST /api/teams/{:id}/members', () => {
    const data = {};
    beforeAll(done => {
        userSeeder
            .seed({
                isAdmin: true,
            })
            .then(user => {
                supertest
                    .post('/login')
                    .send({
                        email: user.email,
                        password: process.env.DUMMY_PASSWORD,
                    })
                    .expect(200)
                    .end((err, { body }) => {
                        data.token = body.token;
                        data.user = body.user;
                        done(err);
                    });
            });
    });

    it('should add a given user to the team', async () => {
        const team = await teamSeeder.seed('Team A');
        const expected = [
            {
                ...data.user,
                team: team._id.toString(),
            },
        ];
        const response = await supertest
            .post(`/api/teams/${team._id}/members`)
            .send({
                member: data.user._id,
            })
            .set('Authorization', `bearer ${data.token}`);

        expect(response.status).toBe(200);
        expect(response.body.members).toHaveLength(1);
    });

    it('should not contain duplicates of a given user', async () => {
        const unExpected = [data.user._id.toString(), data.user._id.toString()];
        const team = await teamSeeder.seed('Team A');
        console.log(JSON.stringify(team));
        const response = await supertest
            .post(`/api/teams/${team._id}/members`)
            .send({
                member: data.user._id,
            })
            .set('Authorization', `bearer ${data.token}`);

        expect(response.status).toBe(200);
        expect(response.body.members).not.toEqual(
            expect.arrayContaining(unExpected)
        );
    });
});

describe('DELETE - /api/teams/{:id}/members', () => {
    const data = {};
    beforeAll(done => {
        userSeeder.seed({ isAdmin: true }).then(user => {
            supertest
                .post('/login')
                .send({
                    email: user.email,
                    password: process.env.DUMMY_PASSWORD,
                })
                .expect(200)
                .end((err, { body }) => {
                    data.token = body.token;
                    data.user = body.user;
                    done(err);
                });
        });
    });

    it('should remove the given user from the team', async () => {
        const team = await teamSeeder.seed('Team A');
        await supertest
            .post(`/api/teams/${team._id}/members`)
            .send({
                member: data.user._id,
            })
            .set('Authorization', `bearer ${data.token}`);

        const response = await supertest
            .delete(`/api/teams/${team._id}/members/${data.user._id}`)
            .set('Authorization', `bearer ${data.token}`);

        expect(response.status).toBe(200);
    });
});

describe('DELETE - /api/teams/{:id}', () => {
    const data = {};
    beforeAll(done => {
        userSeeder.seed({ isAdmin: true }).then(user => {
            supertest
                .post('/login')
                .send({
                    email: user.email,
                    password: process.env.DUMMY_PASSWORD,
                })
                .expect(200)
                .end((err, { body }) => {
                    data.token = body.token;
                    data.user = body.user;
                    done(err);
                });
        });
    });
    it('should delete a given team', async () => {
        const team = await teamSeeder.seed('Team A');
        const response = await supertest
            .delete(`/api/teams/${team._id}`)
            .set('Authorization', `bearer ${data.token}`);

        expect(response.status).toBe(204);
    });
});
