const httpCodes = require('http-status-codes');
const User = require('../database/models/user.model');
const validation = require('../validation/user.validation');
const _ = require('lodash');
const securityUtils = require('../securityUtils');

exports.index = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            message: 'Got users',
            users,
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong creating user`,
            error,
        });
        console.error(error.message);
    }
};
exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('team');
        if (_.isNil(user)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        user.password = undefined;

        res.status(httpCodes.OK).json({
            message: `Found user`,
            user,
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong finding user ${req.params.userId}`,
            error,
        });
    }
};
exports.store = async (req, res) => {
    try {
        const validated = await validation.validateAsync(req.body);

        const exists = await User.findOne({
            email: validated.email,
        });

        if (!_.isNil(exists)) {
            res.status(httpCodes.BAD_REQUEST).json({
                email: `${exists.email} already exists!`,
            });
            return;
        }

        const hashedPassword = await securityUtils.hashPassword(
            validated.password
        );

        const user = new User({ ...validated, password: hashedPassword });

        await user.save();

        user.password = undefined;
        res.status(httpCodes.CREATED).json({
            message: 'User created',
            user,
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong creating user`,
            error,
        });
        console.error(error.message);
    }
};
exports.destory = (req, res) => {
    try {
        User.findByIdAndDelete(req.params.userId).exec();
        res.status(httpCodes.NO_CONTENT).send();
    } catch (e) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong deleting user ${req.params.teamId}`,
        });
        console.error(e.message);
    }
};
exports.update = async (req, res) => {
    try {
        const validated = await validation.validateAsync(req.body);
        User.findByIdAndUpdate(
            req.params.userId,
            { ...validated },
            (err, user) => {
                if (_.isNil(user)) {
                    res.status(httpCodes.NOT_FOUND).send();
                    return;
                }

                if (!_.isNil(err)) {
                    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                        message: 'Something went wrong',
                        err,
                    });
                    return;
                }

                res.status(httpCodes.OK).json({
                    message: `${user.name} updated!`,
                    user,
                });
            }
        );
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong updating user ${req.params.userId}`,
            error,
        });
        console.error(e.message);
    }
};

exports.enableUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.enabled = true;
        if (_.isNil(user)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        await user.save();
        user.password = undefined;

        res.status(httpCodes.OK).json({
            message: `${user.name} disabled!`,
            user,
        });
    } catch (error) {
        throw error;
    }
};

exports.disableUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.enabled = false;
        if (_.isNil(user)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        await user.save();
        user.password = undefined;

        res.status(httpCodes.OK).json({
            message: `${user.name} disabled!`,
            user,
        });
    } catch (error) {}
};
