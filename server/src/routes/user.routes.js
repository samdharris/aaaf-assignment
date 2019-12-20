const { Router } = require('express');
const controller = require('../controllers/users.controller');
const router = Router();

router.get('/', controller.index);
router.get('/:userId', controller.show);
router.post('/', controller.store);
router.delete('/:userId', controller.destory);
router.put('/:userId', controller.update);

module.exports = router;
