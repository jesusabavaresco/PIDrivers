const axios = require('axios');
const { Router } = require('express');
const userRouter = Router();
const { Teams } = require('../db')
const {
    getTeams
} = require('../controllers/teamsControllers')

userRouter.get('/', async (req, res) => {
    const call = await getTeams();
    call.forEach(el => {
        Teams.findOrCreate({
            where: { name: el}
        });
    });
    const allTeams = await Teams.findAll()
    res.status(201).json({data: allTeams});
})

module.exports = userRouter;