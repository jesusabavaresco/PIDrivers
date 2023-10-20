const { Router} = require('express');
const userRouter = Router();
const { Driver, Teams } = require('../db');
const {
    allInfo,
    getDriversId
} = require('../controllers/driversControllers')

userRouter.get('/', async( req, res) => {
    const name = req.query.name;
    const drivers = await allInfo();

    if(name) {
        const completeName = drivers.filter((e) => e.name + ' ' + e.lastName === name)
        console.log(completeName);
        const names = drivers.filter((el) => el.name?.toLowerCase().includes(name.toLowerCase()) || el.lastName?.toLowerCase().includes(name.toLowerCase()))
        if(names.length){
            res.status(200).send(names)
        }else {
            res.status(404).send('Not found')
        }
    } else {
        res.status(200).send(drivers)
    }

});
userRouter.get('/:id', async (req, res) => {
    let id = req.params.id;
  
    if(id){
        let allIds = await getDriversId(id);
        if(allIds.length){
            res.status(200).send(allIds)
        } else {
            res.status(404).send('Not found Driver')
        }
    } else {
        res.status('Not found')
    }
});
userRouter.post('/', async (req, res) => {
    let {
        name,
        lastName,
        description,
        image,
        nationality,
        birthDate,
        teams
    } = req.body

    const driversCreated = await Driver.create({
        name,
        lastName,
        description,
        image,
        nationality,
        birthDate
    });

    let teamsDb = await Teams.findAll({
        where: {name: teams}
    })
    driversCreated.addTeams(teamsDb)
    res.status(200).send('driver created successfully')

})
module.exports = userRouter;
