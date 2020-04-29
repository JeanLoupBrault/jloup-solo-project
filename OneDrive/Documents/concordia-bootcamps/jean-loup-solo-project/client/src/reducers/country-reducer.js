const initialState = {
  countries: [],
  status: "loading",
};

export default function countryReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_COUNTRIES": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_COUNTRIES": {
      return {
        ...state,
        countries: action.countries,
        status: "idle",
      };
    }
    case "RECEIVE_COUNTRIES_ERROR": {
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
