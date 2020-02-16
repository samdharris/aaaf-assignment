const httpCodes = require('http-status-codes');
const Team = require('../database/models/team.model');
const User = require('../database/models/user.model');
const validation = require('../validation/team.validation');
const _ = require('lodash');

/**
 * GET /api/teams
 *
 * Returns all teams. Only accessible by an admin user.
 */
exports.index = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(httpCodes.OK).json({
            message: 'Retrieved teams',
            teams,
        });
    } catch (e) {
        res.status(httpCodes.BAD_REQUEST).json({
            message: 'Something went wrong getting teams',
        });
    }
};

/**
 * GET /api/teams/:teamId
 *
 * Gets the requested team with all members.
 */
exports.show = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId)
            .populate('members')
            .populate('documents');

        res.status(httpCodes.OK).json({
            message: 'Team found!',
            team,
        });
    } catch (e) {
        res.status(httpCodes.NOT_FOUND).send();
        console.error(e.message);
    }
};

/**
 * POST /api/teams
 *
 * Creates a new team. Only accessible by admin users
 */
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
        res.status(httpCodes.BAD_REQUEST).json({
            message: `Something went wrong creating team`,
            error,
        });
        console.error(e.message);
    }
};

/**
 * DELETE /api/teams/:teamId
 *
 * Deletes a given team. Only accessible by admin users
 */
exports.destory = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const team = req.team;

        // Unassign members from the team
        for (let i = 0; i < team.members.length; i++) {
            const user = await User.findById(team.members[i]);
            user.team = null;
            await user.save();
        }

        Team.findByIdAndDelete(teamId).exec();
        res.status(httpCodes.NO_CONTENT).send();
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
            message: `Something went wrong ${error.message}`,
            error,
        });
        console.error(error.message);
    }
};

/**
 * PUT /api/teams/:teamId
 *
 * Updates a given team. Only accessible by admin users
 */
exports.update = async (req, res) => {
    try {
        const validated = await validation.validateAsync(req.body);
        const team = req.team;
        Object.keys(validated).forEach(k => (team[k] = validated[k]));

        await team.save();
        res.status(httpCodes.OK).json({
            message: `${team.name} updated!`,
            team,
        });
    } catch ({ message }) {
        res.status(httpCodes.BAD_REQUEST).json({
            message: `Error updating: ${message}`,
        });
        console.error(error.message);
    }
};

/**
 * POST /api/teams/members
 *
 * Adds a given user to the specified team. Only accessible by admin users
 */
exports.addUser = async (req, res) => {
    try {
        const newMemberId = req.body.member;
        const teamId = req.params.teamId;
        const team = req.team;

        if (team.members.indexOf(newMemberId) === -1) {
            team.members.push(newMemberId);

            // Check that the user isn't already associated with a team. If they are, remove them from that team
            // and add them to this team.
            const user = await User.findById(newMemberId).populate('team');
            if (!_.isNil(user.team) && user.team !== teamId) {
                const usrCurrTeam = await Team.findById(user.team);
                usrCurrTeam.members.remove(newMemberId);
                await usrCurrTeam.save();
            }

            user.team = team;
            await user.save();
        }

        await team.save();
        const { members } = await Team.findById(req.params.teamId).populate(
            'members'
        );
        res.json({
            message: 'Member(s) added!',
            members,
        });
    } catch (error) {
        throw error;
    }
};

/**
 * DELETE /api/teams/:teamId/members/:memberId
 *
 * Removes a given user from the given team. Only accessible by admin users
 */
exports.removeUser = async (req, res) => {
    try {
        const { teamId, memberId } = req.params;
        const user = await User.findById(memberId);
        user.team = null;
        await user.save();
        const team = req.team;
        team.members.remove(memberId);
        await team.save();
        res.json({
            message: 'Member removed!',
        });
    } catch (error) {
        throw error;
    }
};
