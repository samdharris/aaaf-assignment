const { Router } = require('express');
const controller = require('../controllers/users.controller');
const router = Router();

const userIsAdmin = require('../middleware/ensureUserIsAdmin');

router.get('/', userIsAdmin, controller.index);
router.get('/:userId', controller.show);
router.post('/', userIsAdmin, controller.store);
router.delete('/:userId', userIsAdmin, controller.destory);
router.put('/:userId', userIsAdmin, controller.update);

router.put('/:userId/enable', userIsAdmin, controller.enableUser);
router.put('/:userId/disable', userIsAdmin, controller.disableUser);

module.exports = router;
