const { Router } = require('express');
const controller = require('../controllers/users.controller');
const router = Router();

router.get('/', controller.index);
router.get('/:userId', controller.show);
router.post('/', controller.store);
router.delete('/:userId', controller.destory);
router.put('/:userId', controller.update);

router.put('/:userId/enable', controller.enableUser);
router.put('/:userId/disable', controller.disableUser);

module.exports = router;
