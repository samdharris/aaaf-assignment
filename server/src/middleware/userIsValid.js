const securityUtils = require('../securityUtils');
const httpCodes = require('http-status-codes');
const _ = require('lodash');
const User = require('../database/models/user.model');

/**
 * Middleware to validate the JWT token in the request.
 */
module.exports = async (req, res, next) => {
    try {
        const header = req.header('Authorization');

        if (_.isNil(header)) {
            res.status(httpCodes.UNAUTHORIZED).send();
            return;
        }

        /**
         * Since we're using bearer tokens, split the string by the [space] in the value of the Authorization header
         * and then get the last element of the array which should be the token itself.
         **/
        const authToken = header.split(' ')[1];
        if (_.isNil(authToken)) {
            res.status(httpCodes.UNAUTHORIZED).send();
            return;
        }

        const tokenDecoded = securityUtils.validateToken(authToken);

        const user = await User.findById(tokenDecoded.id);

        if (_.isNil(user)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        if (!user.enabled) {
            res.status(httpCodes.UNAUTHORIZED).json({
                message: 'User is disabled!',
            });
            return;
        }

        req.userId = user.id;
        req.adminRequest = user.isAdmin;
        next();
    } catch (error) {
        res.status(httpCodes.UNAUTHORIZED).send();
        return;
    }
};
