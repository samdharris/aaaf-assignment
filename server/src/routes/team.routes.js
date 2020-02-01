const { Router } = require('express');
const controller = require('../controllers/teams.controller');
const documentRoutes = require('./documents.routes');

const ensureTeamExists = require('../middleware/ensureTeamExists');
const userIsMemberOfTeam = require('../middleware/userIsMemberOfTeam');

const router = Router();

router.get('/', controller.index);
router.get('/:teamId', ensureTeamExists, userIsMemberOfTeam, controller.show);
router.post('/', controller.store);
router.delete('/:teamId', ensureTeamExists, controller.destory);
router.put('/:teamId', ensureTeamExists, controller.update);

router.post('/:teamId/members', ensureTeamExists, controller.addUser);
router.delete(
    '/:teamId/members/:memberId',
    ensureTeamExists,
    controller.removeUser
);

router.use('/:teamId/documents/', documentRoutes);

module.exports = router;
