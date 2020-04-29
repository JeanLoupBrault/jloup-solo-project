const initialState = {
  sellers: [],
  status: "loading",
};

export default function sellerReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_SELLERS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_SELLERS": {
      return {
        ...state,
        countries: action.countries,
        status: "idle",
      };
    }
    case "RECEIVE_SELLERS_ERROR": {
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
