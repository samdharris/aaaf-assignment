const userSeeder = require('./users.seeder');
const teamSeeder = require('./teams.seeder');
const database = require('../index');
const assert = require('assert');
const _ = require('lodash');

require('dotenv').config();

exports.run = async numToCreate => {
    await database.connect();
    const createdUsers = await generateUsers(numToCreate);
    const createdTeams = await generateTeams();

    await assignUsersToTeams(createdUsers, createdTeams);

    console.log('DONE');
    process.exit(0);
};

/**
 * Takes users and teams and assigns users to teams. This divides the number of users so that each team has 4 users
 * associated with it.
 * @param {array} createdUsers Array of created users to assign to the created teams
 * @param {array} createdTeams Array of created teams to assign users to
 */
async function assignUsersToTeams(createdUsers, createdTeams) {
    for (let i = 0; i < createdTeams.length; i++) {
        console.log(
            `Users remaining to assign to a team: ${createdUsers.length}`
        );
        const members = createdUsers.splice(0, 4);
        const team = createdTeams[i];

        members.forEach(member => {
            assert(
                team.members.indexOf(member._id) === -1,
                `User in team ${team.name}`
            );
            team.members.push(member._id);
        });

        await team.save();

        for (let y = 0; y < members.length; y++) {
            members[y].team = team._id;
            assert(
                !_.isNil(members[y].team),
                `Failed setting team for member ${members[y].name}`
            );
            await members[y].save();
        }
    }
}

/**
 * Generates x number of users for the system.
 * @param {number} numToCreate Number of users to create
 */
async function generateUsers(numToCreate) {
    const createdUsers = [];
    for (let ii = 0; ii < numToCreate; ii++) {
        const user = await userSeeder.seed();
        createdUsers.push(user);
    }

    return createdUsers;
}

/**
 * Generates pre-defined teams for the system.
 */
async function generateTeams() {
    const predefinedTeams = [
        'Creative',
        'Sales',
        'Marketing',
        'Management & Support',
    ];

    const createdTeams = [];
    for (let i = 0; i < predefinedTeams.length; i++) {
        const team = await teamSeeder.seed(predefinedTeams[i]);
        createdTeams.push(team);
    }

    return createdTeams;
}
