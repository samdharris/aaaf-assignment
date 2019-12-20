const { Router } = require('express');
const controller = require('../controllers/teams.controller');
const router = Router();

router.get('/', controller.index);
router.get('/:teamId', controller.show);
router.post('/', controller.store);
router.delete('/:teamId', controller.destory);
router.put('/:teamId', controller.update);

module.exports = router;
