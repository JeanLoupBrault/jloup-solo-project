const initialState = {
  regions: [],
  status: "loading",
};

export default function regionReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_REGIONS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_REGIONS": {
      return {
        ...state,
        regions: action.farmerbasket.regions,
        status: "idle",
      };
    }
    case "RECEIVE_REGIONS_ERROR": {
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
