export const formatPriceForHumans = (price) =>
  price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
