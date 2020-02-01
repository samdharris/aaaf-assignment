const httpCodes = require('http-status-codes');
const userRepository = require('../database/respositories/user.respsitory');
const Team = require('../database/models/team.model');
const validation = require('../validation/user.validation');
const _ = require('lodash');
const securityUtils = require('../securityUtils');

exports.index = async (req, res) => {
    try {
        const users = await userRepository.all();
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
        const user = await userRepository.findById(req.params.userId, {
            populate: 'team',
        });

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

        const exists = await userRepository.findByEmail(validated.email);

        if (!_.isNil(exists)) {
            res.status(httpCodes.BAD_REQUEST).json({
                email: `${exists.email} already exists!`,
            });
            return;
        }

        const hashedPassword = await securityUtils.hashPassword(
            validated.password
        );

        const user = await userRepository.create({
            ...validated,
            password: hashedPassword,
        });

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
exports.destory = async (req, res) => {
    try {
        // Remove user from team
        const user = await userRepository.findById(req.params.userId);

        if (!_.isNil(user.team)) {
            const team = await Team.findById(user.team);
            team.members = team.members.filter(member => member !== user._id);
            await team.save();
        }

        await userRepository.delete(req.params.userId);
        res.status(httpCodes.NO_CONTENT).send();
    } catch (e) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong: ${e.message}`,
        });
        console.error(e.message);
    }
};
exports.update = async (req, res) => {
    try {
        const id = req.params.userId;
        let user = await userRepository.findById(id);

        if (_.isNil(user)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        const validated = await validation.validateAsync(req.body);

        user = await userRepository.update(id, validated);

        user.password = undefined;
        await res.status(httpCodes.OK).json({
            message: `${user.name} updated!`,
            user,
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Error updating user: ${error.message}`,
            error,
        });
    }
};

exports.enableUser = async (req, res) => {
    try {
        const user = await userRepository.enableUser(req.params.userId);
        if (_.isNil(user)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        user.password = undefined;

        res.status(httpCodes.OK).json({
            message: `${user.name} enabled!`,
            user,
        });
    } catch (error) {
        throw error;
    }
};

exports.disableUser = async (req, res) => {
    try {
        const user = await userRepository.disableUser(req.params.userId);
        if (_.isNil(user)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        user.password = undefined;

        res.status(httpCodes.OK).json({
            message: `${user.name} disabled!`,
            user,
        });
    } catch (error) {}
};
