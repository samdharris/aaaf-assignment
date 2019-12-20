const httpCodes = require('http-status-codes');

exports.index = (req, res) => {
    res.status(httpCodes.OK).json({
        message: 'Working!',
    });
};

exports.show = (req, res) => {};
exports.store = (req, res) => {};
exports.destory = (req, res) => {};

exports.update = (req, res) => {};
