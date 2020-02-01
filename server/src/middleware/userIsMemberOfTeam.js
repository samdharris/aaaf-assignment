const httpCodes = require('http-status-codes');
const Team = require('../database/models/team.model');
const User = require('../database/models/user.model');
const _ = require('lodash');

module.exports = async (req, res, next) => {
    const userId = req.userId;
    if (_.isNil(userId)) {
        req.status(httpCodes.INTERNAL_SERVER_ERROR).send();
        console.error('userId not set on request');
        return;
    }

    if (_.isNil(req.params.teamId)) {
        req.status(httpCodes.INTERNAL_SERVER_ERROR).send();
        console.error('teamId not set on request');
        return;
    }

    const team = await Team.findById(req.params.teamId);

    const user = await User.findById(userId);
    if (team.members.indexOf(userId) === -1 && !user.isAdmin) {
        res.status(httpCodes.FORBIDDEN).send();
        return;
    }

    next();
};
