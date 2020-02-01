const httpCodes = require('http-status-codes');
module.exports = async (req, res, next) => {
    if (req.params.userId !== req.userId && !req.adminRequest) {
        res.status(httpCodes.FORBIDDEN).send();
        return;
    }
    next();
};
