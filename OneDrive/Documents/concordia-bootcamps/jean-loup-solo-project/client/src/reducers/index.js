import { combineReducers } from "redux";

import country from "./country-reducer";
import category from "./category-reducer";
import product from "./product-reducer";
import feature from "./feature-reducer";
import { cartReducer } from "./cart-reducer";
import categoryProduct from "./category-product-reducer";

const cart = cartReducer;

export default combineReducers({
  country,
  category,
  product,
  feature,
  cart,
  categoryProduct,
});
