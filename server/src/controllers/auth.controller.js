const validation = require('../validation/auth.validation');
const userRepository = require('../database/respositories/user.respsitory');
const httpCodes = require('http-status-codes');
const _ = require('lodash');
const securityUtils = require('../securityUtils');
/**
 * POST /login
 * Handles the login request for a user
 */
exports.login = async (req, res) => {
    try {
        const validated = await validation.validateAsync(req.body);

        const user = await userRepository.findByEmail(validated.email, {
            populate: 'team',
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

/**
 * POST /verify
 *
 * Verfies a given JWT token to ensure it's valid
 */
exports.verify = async (req, res) => {
    try {
        const user = await userRepository.findById(req.userId, {
            populate: 'team',
        });

        user.password = undefined;
        res.json({
            message: 'User verified!',
            user,
        });
    } catch (error) {
        res.status(httpCodes.UNAUTHORIZED).send();
    }
};
