const initialState = {
    categories: [],
    status: "idle"
}

export default function categoryReducer( state = initialState, action){
    switch(action.type) {
        case "REQUEST_CATEGORIES": {
            return {
                ...state,
                status: "loading",
            };
        }
        case "RECEIVE_CATEGORIES": {
            return {
                ...state, 
                categories: action.categories,
                status: "idle",
            };
        }
        case "RECEIVE_CATEGORIES_ERROR": {
            return {
                ...state,
                status: "error",
            };
        }
        default: {
            return state;
        }
    }
}