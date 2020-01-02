const faker = require('faker');
const Team = require('../models/team.model');
exports.seed = async teamName => {
    const team = new Team({
        name: teamName,
    });

    await team.save();

    return Promise.resolve(team);
};
