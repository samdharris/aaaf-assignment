const Document = require('../database/models/document.model');
const Team = require('../database/models/team.model');
const DocumentVersion = require('../database/models/documentVersion.model');
const path = require('path');
const _ = require('lodash');
const httpCodes = require('http-status-codes');
const validation = require('../validation/document.validation');
const fs = require('fs');

exports.index = async (req, res) => {
    try {
        const documents = await Document.find({
            team: req.params.teamId,
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
exports.show = async (req, res) => {
    try {
        const document = await await Document.findById(
            req.params.documentId
        ).populate('versions');

        if (_.isNil(document)) {
            res.status(httpCodes.NOT_FOUND).send();
        }

        res.json({
            message: 'Document found!',
            document,
        });
    } catch (error) {}
};

exports.store = async (req, res) => {
    try {
        const document = req.files.document;
        const teamId = req.params.teamId;
        const validated = await validation.validateAsync({
            name: document.name,
            size: document.size,
            mimetype: document.mimetype,
        });

        const team = await Team.findById(teamId);

        if (_.isNil(team)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        await document.mv(
            path.join(
                __dirname,
                `../../storage/team-${teamId}/${document.name}`
            )
        );

        let mongoDoc = new Document({
            name: validated.name,
            path: `team-${teamId}/${validated.name}`,
            team: teamId,
        });

        const version = new DocumentVersion({
            size: validated.size,
            type: validated.mimetype,
        });

        mongoDoc.versions.push(version);
        mongoDoc = await mongoDoc.save();

        version.document = mongoDoc;
        await version.save();

        team.documents.push(mongoDoc);
        await team.save();
        res.status(httpCodes.CREATED).json({
            message: 'Document uploaded!',
            document: mongoDoc,
        });
    } catch (error) {
        res.status(httpCodes.BAD_REQUEST).json({
            message: `Something went wrong: ${error.message}`,
            document: error.message,
        });
    }
};
exports.update = (req, res) => {};
exports.destory = async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        fs.unlinkSync(
            path.join(
                __dirname,
                path.join(__dirname, `../../storage/${document.path}`)
            )
        );

        await document.remove();
    } catch (error) {}
};
