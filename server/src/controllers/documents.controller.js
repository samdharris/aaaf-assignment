const Document = require('../database/models/document.model');
const User = require('../database/models/user.model');
const userRepository = require('../database/respositories/user.respsitory');
const DocumentVersion = require('../database/models/documentVersion.model');
const path = require('path');
const _ = require('lodash');
const httpCodes = require('http-status-codes');
const validation = require('../validation/document.validation');
const fs = require('fs');

const sizeOf = require('image-size');

/**
 * GET /api/teams/:teamId/documents
 *
 * Returns all documents for a given team
 */
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
/**
 * GET /api/teams/:teamId/documents/:documentId
 *
 * Returns the given document with all its associated versions.
 */
exports.show = async (req, res) => {
    try {
        const document = await await Document.findById(
            req.params.documentId
        ).populate({
            path: 'versions',
            populate: {
                path: 'checkedOutBy',
                model: User,
            },
        });

        res.json({
            message: 'Document found!',
            document,
        });
    } catch (error) {}
};

/**
 * POST /api/teams/:teamId/documents
 *
 * Uploads and creates a new document.
 */
exports.store = async (req, res) => {
    try {
        const document = req.files.document;
        const validated = await validation.validateAsync({
            name: document.name,
            size: document.size,
            mimetype: document.mimetype,
        });

        const team = req.team;
        const filePath = path.join(
            __dirname,
            `../../storage/team-${team._id}/1-${document.name}`
        );
        await document.mv(filePath);

        let mongoDoc = new Document({
            name: validated.name,
            path: `team-${team._id}/1-${validated.name}`,
            team: team._id,
        });

        let width = 0;
        let height = 0;

        /**
         * Get the image's dimensions but only if we're uploading an image file.
         */
        if (validated.mimetype.indexOf('image') > -1) {
            const dimensions = sizeOf(filePath);
            width = dimensions.width;
            height = dimensions.height;
        }

        const version = new DocumentVersion({
            size: validated.size,
            type: validated.mimetype,
            width,
            height,
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
/**
 * PUT /api/teams/:teamId/documents/:documentId
 *
 * Updates a given document. Creating a new version. Can only be accessed by the user who has the requested document
 * checked out.
 */
exports.update = async (req, res) => {
    try {
        const team = req.team;
        let mongoDoc = await Document.findById(req.params.documentId).populate(
            'versions'
        );

        const document = req.files.document;
        const validated = await validation.validateAsync({
            name: document.name,
            size: document.size,
            mimetype: document.mimetype,
        });

        const newVersion = mongoDoc.versions.length + 1;
        const filePath = path.join(
            __dirname,
            `../../storage/team-${team._id}/${newVersion}-${document.name}`
        );

        await document.mv(filePath);

        let width = 0;
        let height = 0;

        /**
         * Get the image's dimensions but only if we're uploading an image file.
         */
        if (validated.mimetype.indexOf('image') > -1) {
            const dimensions = sizeOf(filePath);
            width = dimensions.width;
            height = dimensions.height;
        }

        const version = new DocumentVersion({
            size: validated.size,
            type: validated.mimetype,
            width,
            height,
            checkedOutBy: req.userId,
        });

        await version.save();

        mongoDoc.path = `team-${team._id}/${newVersion}-${validated.name}`;
        mongoDoc.versions.push(version);
        mongoDoc = await mongoDoc.save();

        res.json({
            message: 'Document updated',
            document: mongoDoc,
        });
    } catch (error) {
        console.error(error);
        res.status(httpCodes.BAD_REQUEST).json({ error });
    }
};
/**
 * DELETE /api/teams/:teamId/documents/:documentId
 *
 * Deletes a given document and ALL associated versions. Can only be accessed by the person who has the requested
 * document checked out
 */
exports.destory = async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId);
        const team = req.team;

        // Remove document from team
        team.documents = team.documents.filter(doc => doc !== documentId);
        await team.save();

        // Delete all versions of the document
        await DocumentVersion.find({
            document: documentId,
        }).remove();

        // finally remove the document from the system and mongo.
        fs.unlinkSync(path.join(__dirname, `../../storage/${document.path}`));

        await document.remove();
        res.status(httpCodes.NO_CONTENT).send();
    } catch (error) {
        throw error;
    }
};

/**
 * PUT /api/teams/:teamId/documents/:documentId/checkout
 *
 * Checks out the requested document to the currently logged in user.
 */
exports.checkoutDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        const version = await DocumentVersion.findById(
            document.versions[document.versions.length - 1]
        );

        const user = await User.findById(req.userId);
        version.checkedOutBy = user;
        await version.save();

        await userRepository.checkoutDocument(req.userId, document);

        res.json({
            message: 'Document checked out!',
            version,
        });
    } catch (error) {
        console.log(error);
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong checking out document',
            error,
        });
    }
};

/**
 * PUT /api/teams/:teamId/documents/:documentId/checkin
 *
 * Checks in the requested document.
 */
exports.checkinDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        const version = await DocumentVersion.findById(
            document.versions[document.versions.length - 1]
        );

        version.checkedOutBy = null;
        await version.save();

        await userRepository.checkinDocument(req.userId, req.params.documentId);

        res.json({
            message: 'Document checked in!',
            version,
        });
    } catch (error) {
        console.error(error);
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong checking out document',
            error,
        });
    }
};
