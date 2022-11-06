const initialState ={
    countries: [],
    allCountries: [],
    activities:[],
    detail:{}
}

export default function rootReducer(state=initialState, action) {
    switch(action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries:action.payload
            };  
            
        case 'GET_SEARCH_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }
        
        case 'FILTER_COUNTRIES':
            const allCountries = state.allCountries
            const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent===action.payload)
            return {
                ...state,
                countries: continentFiltered
            }
        
        case 'POST_ACTIVITY':
            return {
                ...state
            }

        case 'ORDER_COUNTRIES':
            let sortearr2
            let sortedArr = action.payload 
            if(  sortedArr === 'asc')  { 
            sortearr2=state.countries.sort(function(a,b) {

                if(a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) }else
            if(sortedArr === 'des') {
             sortearr2= state.countries.sort(function(a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })}else
            if(sortedArr === 'population-+'){
               sortearr2= state.countries.sort(function(a,b){
                   return  a.polulation - b.population})
            }else
            if(sortedArr === 'population+-') {
               sortearr2= state.countries.sort(function(a,b){
                return b.population - a.population})
            }
        return {
            ...state,
            countries: [...sortearr2]
        }
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }

        case "GET_ACTIVITIES":
            
            return{
                ...state,
                activities: action.payload
            }

        default:
                return state;
            
    }
    
}

