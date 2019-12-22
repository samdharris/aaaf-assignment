const securityUtils = require('../securityUtils');
const httpCodes = require('http-status-codes');
const _ = require('lodash');
const User = require('../database/models/user.model');

module.exports = async (req, res, next) => {
    try {
        const header = req.header('Authorization');
        const authToken = header.split(' ')[1];
        if (_.isNil(authToken)) {
            res.status(httpCodes.UNAUTHORIZED).send();
            return;
        }

        const tokenIsValid = securityUtils.validateToken(authToken);

        const user = await User.findById(tokenIsValid.id);
        if (!user.enabled) {
            res.status(httpCodes.UNAUTHORIZED).json({
                message: 'User is disabled!',
            });
            return;
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(httpCodes.UNAUTHORIZED).send();
        return;
    }
};
