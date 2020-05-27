const initialState = {
  currentRegion: null,
  products: [],
  status: "idle",
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_REGION_PRODUCTS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_REGION_PRODUCTS": {
      return {
        ...state,
        currentRegion: action.region,
        products: action.products,
        status: "idle",
      };
    }

    case "RECEIVE_REGION_PRODUCTS_ERROR": {
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
