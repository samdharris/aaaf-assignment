const { Router } = require('express');
const controller = require('../controllers/documents.controller');
const router = Router();

router.get('/', controller.index);
router.get('/:documentId', controller.show);
router.post('/', controller.store);
router.delete('/:documentId', controller.destory);
router.put('/:documentId', controller.update);

module.exports = router;
