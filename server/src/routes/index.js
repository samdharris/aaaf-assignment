const { Router } = require('express');
const teamRoutes = require('./team.routes');

const router = Router();

router.use('/api/teams', teamRoutes);

module.exports = router;
