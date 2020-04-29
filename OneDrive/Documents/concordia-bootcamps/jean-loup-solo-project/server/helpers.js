const companyData = require("./data/companies.json");
const sellerData = require("./data/farmerBasket.json");
const availableProductData = require("./data/farmerBasket.json");

const MAX_DELAY = 1000;
const FAILURE_ODDS = 0.01;

const simulateProblems = (res, data) => {
  const delay = Math.random() * MAX_DELAY;

  setTimeout(() => {
    const shouldError = Math.random() <= FAILURE_ODDS;

    if (shouldError) {
      res.sendStatus(500);
      return;
    }

    res.json(data);
  }, delay);
};

const getCountryList = () => {
  const countryList = companyData.map((country) => {
    return country.country;
  });
  const uniqueCountries = Array.from(new Set(countryList));
  return uniqueCountries;
};

const getSellerList = () => {
  const sellerList = sellerData.map((sellerName) => {
    return sellerName.sellerName;
  });
  const uniqueSellers = Array.from(new Set(sellerList));
  return uniqueSellers;
};

const getAvailableProductList = () => {
  const availableProductList = availableProductData.map((available) => {
    if (available.available === true) {
      return available.name;
    }
  });
  const availableProducts = Array.from(new Set(availableProductList));
  return availableProducts;
};

module.exports = { simulateProblems, getCountryList, getSellerList, getAvailableProductList };
