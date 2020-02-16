const httpCodes = require('http-status-codes');

/**
 * Middleware to ensure that the currently signed in user is the same as the requested user.
 */
module.exports = async (req, res, next) => {
    if (req.params.userId !== req.userId && !req.adminRequest) {
        res.status(httpCodes.FORBIDDEN).send();
        return;
    }
    next();
};
