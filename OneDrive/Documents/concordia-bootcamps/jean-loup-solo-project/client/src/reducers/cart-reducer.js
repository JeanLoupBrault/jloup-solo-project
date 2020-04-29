const initialState = {};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return {
        ...state,
        [action.feature.id]: {
          ...action.feature,
          quantity:
            state[action.feature.id] && state[action.feature.id].quantity
              ? state[action.feature.id].quantity + 1
              : 1,
        },
      };
    }
    case "REMOVE_PRODUCT": {
      const newCart = { ...state };
      delete newCart[action.feature];
      return newCart;
    }

    case "UPDATE_PRODUCT": {
      const { feature, newQuantity } = action;
      return {
        ...state,
        [feature]: {
          ...state[feature],
          quantity: newQuantity,
        },
      };
    }
    case "CLEAR_CART": {
      return initialState;
    }
    default:
      return state;
  }
}

export const getStoreProductArray = (state) => Object.values(state);
