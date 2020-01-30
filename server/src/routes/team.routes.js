const { Router } = require('express');
const controller = require('../controllers/teams.controller');
const documentRoutes = require('./documents.routes');

const ensureTeamExists = require('../middleware/ensureTeamExists');
const router = Router();

router.get('/', controller.index);
router.get('/:teamId', controller.show);
router.post('/', controller.store);
router.delete('/:teamId', controller.destory);
router.put('/:teamId', ensureTeamExists, controller.update);

router.post('/:teamId/members', controller.addUser);
router.delete('/:teamId/members/:memberId', controller.removeUser);

router.use('/:teamId/documents/', documentRoutes);

module.exports = router;
