const validation = require('../validation/auth.validation');
const User = require('../database/models/user.model');
const httpCodes = require('http-status-codes');
const _ = require('lodash');
const securityUtils = require('../securityUtils');

exports.login = async (req, res) => {
    try {
        const validated = await validation.validateAsync(req.body);

        const user = await User.findOne({
            email: validated.email,
        });

        if (_.isNil(user)) {
            res.status(httpCodes.BAD_REQUEST).json({
                email: ["Email address doesn't match"],
            });
            return;
        }

        const hashesAreSame = await securityUtils.hashesAreSame(
            validated.password,
            user.password
        );

        if (!hashesAreSame) {
            res.status(httpCodes.BAD_REQUEST).json({
                password: ['password is invalid'],
            });
            return;
        }

        if (!user.enabled) {
            res.status(httpCodes.UNAUTHORIZED).json({
                email: 'User is disabled!',
            });
            return;
        }

        user.password = undefined;
        res.json({
            message: 'Login successful!',
            user,
            token: securityUtils.generateToken({
                id: user.id,
            }),
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong logging in`,
            error,
        });
        console.error(error.message);
    }
};

exports.verify = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json({
            message: 'User verified!',
            user,
        });
    } catch (error) {
        res.status(httpCodes.UNAUTHORIZED).send();
    }
};
