const userRepository = require('../database/respositories/user.respsitory');
const _ = require('lodash');
const httpCodes = require('http-status-codes');

/**
 * Middleware to ensure that the given user has the requested document checked out
 */
module.exports = async (req, res, next) => {
    const user = userRepository.findById(req.userId);

    if (
        !_.isEmpty(user.checkedOutDocuments) &&
        user.checkedOutDocuments.indexOf(req.params.documentId) > -1
    ) {
        res.status(httpCodes.BAD_REQUEST).json({
            message: 'Document already checked out!',
        });
        return;
    }

    next();
};
