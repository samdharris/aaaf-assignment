const { Router } = require('express');
const controller = require('../controllers/users.controller');
const router = Router();

const userIsAdmin = require('../middleware/ensureUserIsAdmin');
const userIsUser = require('../middleware/ensureUserIsUser');

router.get('/', userIsAdmin, controller.index);
router.get('/:userId', userIsUser, controller.show);
router.post('/', userIsAdmin, controller.store);
router.delete('/:userId', userIsAdmin, controller.destory);
router.put('/:userId', controller.update);

router.put('/:userId/enable', userIsAdmin, controller.enableUser);
router.put('/:userId/disable', userIsAdmin, controller.disableUser);

module.exports = router;
