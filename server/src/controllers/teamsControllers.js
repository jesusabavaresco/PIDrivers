const axios = require('axios');

const getTeams = async () => {
    let teams = []
    await axios('http://localhost:5000/drivers').then((response) => {
      let arrTeams = response.data?.map((el) => el.teams)
    
      if(arrTeams.length > 0){
        arrTeams.map((t) => {
          let singleTeams;
          if(t !== undefined){
            singleTeams = t.split(',');
            singleTeams.map((el) => {
            el = el.trim()
            const validation = teams.some((team) => team === el)
            if(validation !== true){
              teams.push(el)
            }
           })
          }
        })
      }
    })
    return teams;
}
module.exports = {
    getTeams,
};