const Team = require('../database/models/team.model');
const _ = require('lodash');
const httpCodes = require('http-status-codes');

module.exports = async (req, res, next) => {
    const team = await Team.findById(req.params.teamId);
    if (_.isNil(team)) {
        res.status(httpCodes.NOT_FOUND).send();
        return;
    }
    req.team = team;
    next();
};
