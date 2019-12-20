const { Router } = require('express');
const teamRoutes = require('./team.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const router = Router();

router.use('/api/teams', teamRoutes);
router.use('/api/users', userRoutes);
router.use(authRoutes);

module.exports = router;
