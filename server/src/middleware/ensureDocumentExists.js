const Document = require('../database/models/document.model');
const httpCodes = require('http-status-codes');
const _ = require('lodash');

/**
 * Middleware to ensure the requested document exists
 */
module.exports = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.documentId);

        if (_.isNil(document)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        req.document = document;
        next();
    } catch (error) {
        res.status(httpCodes.NOT_FOUND).send();
    }
};
