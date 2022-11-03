const initialState ={
    countries: [],
    allCountries: []
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
            let sortedArr = action.payload === 'asc' ? 
            state.countries.sort(function(a,b) {
                if(a.nombre > b.nombre) {
                    return 1;
                }
                if (b.nombre > a.nombre) {
                    return -1;
                }
                return 0;
            }) : 
            state.countries.sort(function(a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })
        return {
            ...state,
            countries: sortedArr
        }

        default:
                return state;
            
    }
    
}

