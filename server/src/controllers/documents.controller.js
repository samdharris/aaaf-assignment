const Document = require('../database/models/document.model');
const Team = require('../database/models/team.model');
const User = require('../database/models/user.model');
const path = require('path');
const _ = require('lodash');
const httpCodes = require('http-status-codes');

exports.index = async (req, res) => {
    try {
        const documents = await Document.find({
            teamId: req.params.teamId,
        }).exec();
        res.json({
            message: 'Documents found!',
            documents,
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong: ${error.message}`,
        });
    }
};
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
