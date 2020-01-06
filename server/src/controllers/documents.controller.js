const Document = require('../database/models/document.model');
const Team = require('../database/models/team.model');
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
    try {
        const document = req.files.document;
        const teamId = req.params.teamId;

        const team = await Team.findById(teamId);

        if (_.isNil(team) || _.isNil(user)) {
            res.status(404).send();
            return;
        }

        await document.mv(
            path.join(
                __dirname,
                `../../storage/team-${teamId}/${document.name}`
            )
        );

        let mongoDoc = new Document({
            name: document.name,
            path: `team-${teamId}/${document.name}`,
            teamId: teamId,
        });

        mongoDoc = await mongoDoc.save();

        team.documents.push(mongoDoc);
        await team.save();
        res.status(httpCodes.CREATED).json({
            message: 'Document uploaded!',
            document: mongoDoc,
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong: ${error.message}`,
        });
    }
};
exports.update = (req, res) => {};
exports.destory = (req, res) => {};
