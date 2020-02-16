const User = require('../database/models/user.model');
const httpCodes = require('http-status-codes');
/**
 * Middleware to ensure the current user is an admin user
 */
module.exports = async (req, res, next) => {
    const user = await User.findById(req.userId);

    if (!user.isAdmin) {
        res.status(httpCodes.FORBIDDEN).send();
        return;
    }

    next();
};
