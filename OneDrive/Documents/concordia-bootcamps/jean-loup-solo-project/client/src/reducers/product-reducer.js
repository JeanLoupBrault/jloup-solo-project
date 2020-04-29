const initialState = {
  currentCountry: null,
  products: [],
  status: "idle",
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_COUNTRY_PRODUCTS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_COUNTRY_PRODUCTS": {
      return {
        ...state,
        currentCountry: action.country,
        products: action.products,
        status: "idle",
      };
    }

    case "RECEIVE_COUNTRY_PRODUCTS_ERROR": {
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
