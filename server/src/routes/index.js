const { Router } = require("express");
const driversRoutes = require('./driversRoutes')
const teamsRoutes = require('./teamsRoutes')

const router = Router();

router.use('/drivers', driversRoutes);
router.use('/teams', teamsRoutes);


module.exports = router;
