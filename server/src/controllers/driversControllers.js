const axios = require('axios');
const { Driver, Teams } = require('../db')

const getDriversApi = async () => {
    let info = []
    try {
        const api = await axios('http://localhost:5000/drivers')
        const result = await api.data;
        const finalResult = result.slice(0, 108);

        info = finalResult.map(el => {
            return {
                id: el.id,
                name: el.name.forename,
                lastName: el.name.surname,
                description: el.description,
                image: el.image.url,
                nationalily: el.nationalily,
                birthDate: el.dob,
                teams: el.teams
            }
        })
        return info

    } catch (error) {
        res.status(400).json({error: error})
    }
}
const infoDB = async () => {
    const result = await Driver.findAll(
        {
            include: {
                model: Teams,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        }
    );
    return result;
}
const allInfo = async () => {
    const api = await getDriversApi();
    const db = await infoDB();
    const aInfo = [...api, ...db];
    return aInfo;
}
const getDriversId = async (id) => {
    const drivers = await allInfo();
    filteredDrivers = drivers.filter(d => d.id == id);
    console.log(filteredDrivers)
    return filteredDrivers
}
module.exports = {
    allInfo,
    getDriversId
};