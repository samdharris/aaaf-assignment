const Document = require('../database/models/document.model');
const Team = require('../database/models/team.model');
const User = require('../database/models/user.model');
const path = require('path');
const _ = require('lodash');

exports.index = (req, res) => {};
exports.show = (req, res) => {};
exports.store = async (req, res) => {
    const document = req.files.document;
    const teamId = req.params.teamId;
    const userId = req.userId;

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);

    if (_.isNil(team) || _.isNil(user)) {
        res.status(404).send();
        return;
    }

    console.log(document);
    await document.mv(
        path.join(__dirname, `../../storage/team-${teamId}/${document.name}`)
    );
};
exports.update = (req, res) => {};
exports.destory = (req, res) => {};
