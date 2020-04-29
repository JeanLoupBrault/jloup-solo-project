const initialState = {
  categoryProducts: [],
  status: "idle",
};

export default function categoryProductReducer(state = initialState, actions) {
  switch (actions.type) {
    case "REQUEST_CATEGORY_PRODUCTS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_CATEGORY_PRODUCTS": {
      return {
        ...state,
        categoryProducts: actions.categoryProducts,
        status: "idle",
      };
    }
    case "RECIEVE_CATEGORY_PRODUCTS_ERROR": {
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
