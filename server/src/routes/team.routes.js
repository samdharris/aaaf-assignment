const { Router } = require('express');
const controller = require('../controllers/teams.controller');
const documentRoutes = require('./documents.routes');

const ensureTeamExists = require('../middleware/ensureTeamExists');
const userIsMemberOfTeam = require('../middleware/userIsMemberOfTeam');
const userIsAdmin = require('../middleware/ensureUserIsAdmin');

const router = Router();

router.get('/', userIsAdmin, controller.index);
router.get('/:teamId', ensureTeamExists, userIsMemberOfTeam, controller.show);
router.post('/', userIsAdmin, controller.store);
router.delete('/:teamId', ensureTeamExists, userIsAdmin, controller.destory);
router.put('/:teamId', ensureTeamExists, userIsAdmin, controller.update);

router.post(
    '/:teamId/members',
    ensureTeamExists,
    userIsAdmin,
    controller.addUser
);
router.delete(
    '/:teamId/members/:memberId',
    ensureTeamExists,
    userIsAdmin,
    controller.removeUser
);

router.use(
    '/:teamId/documents/',
    ensureTeamExists,
    userIsMemberOfTeam,
    documentRoutes
);

module.exports = router;
