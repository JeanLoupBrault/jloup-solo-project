const initialState = {
  farmers: [],
  status: "loading",
};

export default function farmerReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_FARMERS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_FARMERS": {
      return {
        ...state,
        farmers: action.farmers,
        status: "idle",
      };
    }
    case "RECEIVE_FARMERS_ERROR": {
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
