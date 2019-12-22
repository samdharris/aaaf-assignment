const securityUtils = require('../securityUtils');
const httpCodes = require('http-status-codes');
const _ = require('lodash');

module.exports = (req, res, next) => {
    try {
        const header = req.header('Authorization');
        const authToken = header.split(' ')[1];
        if (_.isNil(authToken)) {
            res.status(httpCodes.UNAUTHORIZED).send();
            return;
        }

        const tokenIsValid = securityUtils.validateToken(authToken);
        next();
    } catch (error) {
        console.error(error);
        res.status(httpCodes.UNAUTHORIZED).send();
        return;
    }
};
