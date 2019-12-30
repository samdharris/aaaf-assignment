const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const router = Router();

const userIsValid = require('../middleware/userIsValid');

router.post('/login', controller.login);
router.post('/verify', userIsValid, controller.verify);

module.exports = router;
