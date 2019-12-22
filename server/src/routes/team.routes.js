const { Router } = require('express');
const controller = require('../controllers/teams.controller');
const router = Router();

router.get('/', controller.index);
router.get('/:teamId', controller.show);
router.post('/', controller.store);
router.delete('/:teamId', controller.destory);
router.put('/:teamId', controller.update);

router.post('/:teamId/members', controller.addUser);
router.delete('/:teamId/members/:memberId', controller.removeUser);

module.exports = router;
