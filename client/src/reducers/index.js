import { combineReducers } from "redux";

import region from "./region-reducer";
import category from "./category-reducer";
import product from "./product-reducer";
import feature from "./feature-reducer";
import { cartReducer } from "./cart-reducer";
import categoryProduct from "./category-product-reducer";

const cart = cartReducer;

export default combineReducers({
  region,
  category,
  product,
  feature,
  cart,
  categoryProduct,
});
