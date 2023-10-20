import { GET_DRIVERS, GET_TEAMS, FILTER_TEAMS, FILTER_CREATED, ORDER_NAME, ORDER_DOB, SEARCH_NAME, GET_DETAIL, POST_DRIVER} from "../redux/actions/types"

const initialState = {
    drivers: [],
    allDrivers: [],
    teams: [],
    detail: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                drivers: action.payload,
                allDrivers: action.payload
            }

        case SEARCH_NAME:
            return {
                ...state,
                drivers: action.payload
            }

        case FILTER_TEAMS:
            const teamsFiltered = action.payload === 'All' ? state.drivers : state.drivers.filter(el => el.teams?.includes(action.payload))
            return {
                ...state,
                drivers: teamsFiltered
            }
        

        case FILTER_CREATED:
            const createdFilter = action.payload === 'All' ? state.allDrivers : action.payload ===  "created" ? state.drivers.filter(el => el.createdinDb) : state.allDrivers.filter(el => !el.createdinDb)
            return {
                ...state,
                drivers: createdFilter
            }

        case ORDER_NAME:
        let arrSort;
        if(action.payload === 'order'){
            arrSort =  state.allDrivers.sort(function (a, b) {
                if (a.id > b.id){
                    return 1
                }

                if (b.id > a.id){

                    return -1
                }

                return 0;
            })
           
        } else if(action.payload === 'asc'){
            arrSort =  state.allDrivers.sort(function (a, b) {
                    if (a.name > b.name){
                        return 1
                    }

                    if (b.name > a.name){

                        return -1
                    }
    
                    return 0;
                })
        } else {
            arrSort =  state.allDrivers.sort(function (a, b) {
                    if (a.name > b.name)
                        return -1
    
                    if (b.name > a.name)
                        return 1
    
                    return 0;
                })
        }
            return {
                ...state,
                drivers: arrSort
            }
        case ORDER_DOB:
            let filtered = state.allDrivers.filter((el) => el.birthDate?.split('-')[0] ===  action.payload)
            return {
                ...state,
                drivers: filtered
            };
        case POST_DRIVER:
            return {
                ...state
            }
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state
    }
}

export default reducer;