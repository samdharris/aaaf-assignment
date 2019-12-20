const httpCodes = require('http-status-codes');
const Team = require('../database/models/team.model');
const validation = require('../validation/team.validation');
const _ = require('lodash');

exports.index = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(httpCodes.OK).json({
            message: 'Retrieved teams',
            teams,
        });
    } catch (e) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong getting teams',
        });
    }
};

exports.show = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId);

        if (_.isNil(team)) {
            res.status(httpCodes.NOT_FOUND).send();
            return;
        }

        res.status(httpCodes.OK).json({
            message: 'Team found!',
            team,
        });
    } catch (e) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong getting team ${req.params.teamId}`,
        });
        console.error(e.message);
    }
};
exports.store = async (req, res) => {
    try {
        const validated = await validation.validateAsync(req.body);

        const team = new Team({
            ...validated,
        });

        await team.save();

        res.status(httpCodes.CREATED).json({
            message: 'Team created',
            team,
        });
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong creating team`,
            error,
        });
        console.error(e.message);
    }
};
exports.destory = (req, res) => {
    try {
        Team.findByIdAndDelete(req.params.teamId).exec();
        res.status(httpCodes.NO_CONTENT).send();
    } catch (e) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong deleting team ${req.params.teamId}`,
        });
        console.error(e.message);
    }
};

exports.update = async (req, res) => {
    try {
        const validated = await validation.validateAsync(req.body);
        Team.findByIdAndUpdate(
            req.params.teamId,
            { ...validated },
            (err, team) => {
                if (_.isNil(team)) {
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
                    message: `${team.name} updated!`,
                    team,
                });
            }
        );
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong updating team ${req.params.teamId}`,
            error,
        });
        console.error(e.message);
    }
};
