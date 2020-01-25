const { Router } = require('express');
const controller = require('../controllers/documents.controller');
const router = Router({
    mergeParams: true,
});

const ensureDocumentNotCheckedOut = require('../middleware/ensureDocumentNotCheckedOut');

router.get('/', controller.index);
router.get('/:documentId', controller.show);
router.post('/', controller.store);
router.delete('/:documentId', controller.destory);
router.put('/:documentId', controller.update);

router.put(
    '/:documentId/checkout',
    ensureDocumentNotCheckedOut,
    controller.checkoutDocument
);
router.put('/:documentId/checkin', controller.checkinDocument);

module.exports = router;
