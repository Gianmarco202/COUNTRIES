import axios  from "axios";

export function getCountries () {
    return async (dispatch) => {
        let pedidoApi = await axios.get("http://localhost:3001/countries/getAll")
        dispatch({ 
            type: 'GET_COUNTRIES', 
            payload: pedidoApi.data });
            
    }
}

export function filterCountries(payload) {
    console.log(payload)
    return {
        type: 'FILTER_COUNTRIES',
        payload 
    }
}

export function getSearchCountries(name) {
    
    return async function(dispatch) {
        var searchName = await axios.get("http://localhost:3001/countries/?name=" + name)
        return dispatch({
            type: 'GET_SEARCH_COUNTRIES',
            payload: searchName.data
            })
        
        }
}

export function postActivity (payload) {
    return async function (dispatch) {
        const create = axios.post("http://localhost:3001/actividades/create", payload);
        console.log(create)
        return create;
    }
}

export function orderCountry(payload) {
    return {
        type: 'ORDER_COUNTRIES',
        payload
    }
}

