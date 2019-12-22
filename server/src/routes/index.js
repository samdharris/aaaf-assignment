const { Router } = require('express');
const teamRoutes = require('./team.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

const userIsValid = require('../middleware/userIsValid');

const router = Router();

router.use('/api/teams', userIsValid, teamRoutes);
router.use('/api/users', userIsValid, userRoutes);
router.use(authRoutes);

module.exports = router;
