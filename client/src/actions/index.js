import axios  from "axios";

export function getCountries () {
    return async (dispatch) => {
        let pedidoApi = await axios.get("http://localhost:3001/countries")
        dispatch({ 
            type: 'GET_COUNTRIES', 
            payload: pedidoApi.data });
            
    }
}

export function filterCountries(payload) {
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

export function getDetail(id) {
    try {
        return async function(dispatch) {
            var country = await axios.get(`http://localhost:3001/countries/${id}`);
            
            return dispatch ({
                type: "GET_DETAIL",
                payload: country.data
                
            })
            
        }
        
    } catch (error) {
        console.log(error)
    }
}

export function getActivities(){
    return async function(dispatch) {
        var activity = await axios.get("http://localhost:3001/actividades/all")
        return dispatch ({
            type: "GET_ACTIVITIES",
            payload: activity.data,
            
        })
    }
}

export function getActivityById(idActivity){
    return async function(dispatch) {
        const activity = await axios.get(`http://localhost:3001/actividades/detail/${idActivity}`)
        console.log(activity.data)
        return dispatch ({
            type: "GET_ACTIVITY_DATA",
            payload: activity.data,
            
        })
    }
}

