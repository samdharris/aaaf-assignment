const httpCodes = require('http-status-codes');
const Team = require('../database/models/team.model');
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
        const team = new Team({
            name: req.body.name,
        });

        await team.save();

        res.status(httpCodes.CREATED).json({
            message: 'Team created',
            team,
        });
    } catch (e) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong creating team`,
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

exports.update = async (req, res) => {};
