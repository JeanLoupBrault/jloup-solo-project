//--------------Request Countries----------//

export const requestCountries = () => ({
  type: "REQUEST_COUNTRIES",
});

export const receiveCountries = (countries) => ({
  type: "RECEIVE_COUNTRIES",
  countries,
});

export const receiveCountriesError = () => ({
  type: "RECEIVE_COUNTRIES_ERROR",
});

//---------------Request Product by Country---------------//

export const requestCountryProducts = () => ({
  type: "REQUEST_COUNTRY_PRODUCTS",
});

export const receiveCountryProducts = (products) => ({
  type: "RECEIVE_COUNTRY_PRODUCTS",
  products,
});

export const receiveCountryProductsError = () => ({
  type: "RECEIVE_COUNTRY_PRODUCTS_ERROR",
});

//-------------Request Feature Products by Country-----//

export const requestFeatures = () => ({
  type: "REQUEST_FEATURE_PRODUCTS",
});

export const receiveFeatures = ({ data, countryId }) => ({
  type: "RECEIVE_FEATURE_PRODUCTS",
  payload: {
    data,
    countryId,
  },
});

export const receiveFeaturesErrors = () => ({
  type: "RECEIVE_FEATURE_PRODUCTS_ERROR",
});
//--------------Request Categories By Country----------//

export const requestCategories = () => ({
  type: "REQUEST_CATEGORIES",
});

export const receiveCategories = (categories) => ({
  type: "RECEIVE_CATEGORIES",
  categories,
});

export const receiveCategoriesError = () => ({
  type: "RECEIVE_CATEGORIES_ERROR",
});

//-----Request Category Products by Country-----------//

export const requestCategoriesProducts = () => ({
  type: "REQUEST_CATEGORY_PRODUCTS",
});

export const receiveCategoriesProducts = (categoryProducts) => ({
  type: "RECEIVE_CATEGORY_PRODUCTS",
  categoryProducts,
});

export const receiveCategoriesProductsError = () => ({
  type: "ECEIVE_CATEGORY_PRODUCTS_ERROR",
});

//--------------Add item to cart--------------------//

export const addProduct = (feature) => ({
  type: "ADD_PRODUCT",
  feature,
});

export const removeProduct = (feature) => ({
  type: "REMOVE_PRODUCT",
  feature,
});

export const updateProduct = (feature, newQuantity) => ({
  type: "UPDATE_PRODUCT",
  feature,
  newQuantity,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

//--------------Request Sellers----------//

export const requestSellers = () => ({
  type: "REQUEST_SELLERS",
});

export const receiveSellers = (sellers) => ({
  type: "RECEIVE_SELLERS",
  sellers,
});

export const receiveSellersError = () => ({
  type: "RECEIVE_SELLERS_ERROR",
});

//value={item.quantity}
//onChange={(ev) =>
// dispatch(updateProduct(item, ev.target.value))
//}
