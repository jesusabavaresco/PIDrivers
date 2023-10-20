import axios from "axios";
import { GET_DRIVERS, GET_TEAMS, FILTER_TEAMS, FILTER_CREATED, ORDER_NAME, ORDER_DOB, SEARCH_NAME, GET_DETAIL} from "./types"

export function getDrivers() {
    return async function (dispatch){
        const data = await axios('http://localhost:3001/drivers');
        console.log('data', data)
        return dispatch({
            type: GET_DRIVERS,
            payload: data.data
        });
    };
};

export const getTeams = () => {
    return async function (dispatch) {
        const data = await axios('http://localhost:3001/teams');
        return dispatch({
            type: GET_TEAMS,
            payload: data.data.data
        });
    };
};

export function filterTeams(payload) {
    return {
        type: FILTER_TEAMS,
        payload
    };
};
export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    };
};
export function orderName(payload) {
    return {
        type: ORDER_NAME,
        payload
    };
};
export function orderDod(payload) {
    return {
        type: ORDER_DOB,
        payload
    };
};
export function searchName(name) {
    return async function (dispatch) {
        let data = await axios.get(`http://localhost:3001/drivers?name=${name}`)

        return dispatch({
            type: SEARCH_NAME,
            payload: data.data
        });
    };
};
export function postDrivers(payload) {
    return async function () {
        const data = await axios.post('http://localhost:3001/drivers', payload);
        return data
    };
};
export function getDetail(id) {
    return async function (dispacth) {
        let data = await axios.get(`http://localhost:3001/drivers/${id}`)
        return dispacth({
            type: GET_DETAIL,
            payload: data.data
        });
    };
};
