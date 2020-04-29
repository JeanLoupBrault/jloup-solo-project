import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  requestFeatures,
  receiveFeatures,
  receiveFeaturesErrors,
  addProduct,
} from "../actions";
import CircularProgress from "@material-ui/core/CircularProgress";
// import CategoryPage from "../CategoryPage/CategoryPage"
function FeaturedProducts() {
  const features = useSelector((state) => state.feature.features);
  const status = useSelector((state) => state.feature.status);
  const productState = useSelector((state) => state.cart);
  const feature = useSelector((state) => state.cart.feature);
  const countryId = useParams();
  const dispatch = useDispatch();
  const [isloaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    dispatch(requestFeatures());
    fetch(`/countries/${countryId.country.replace(" ", "")}/featuredproducts`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveFeatures({ data, countryId }));
      })
      .catch((error) => {
        dispatch(receiveFeaturesErrors(error));
      });
  }, []);
  return (
    <FeatureWrapper>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
          features.map((feature) => {
            const inStock = feature.numInStock <= 0;
            return (
              <ProductWrapper>
                <ProductLink to={`/detail/${feature.id}`}>
                  <ProductImage src={feature.imageSrc}></ProductImage>
                  <ProductName>{feature.name}</ProductName>
                  <ProductPrice>{feature.price}</ProductPrice>
                </ProductLink>
                <ProductStock>
                  {inStock
                    ? `We're Out of Stock! Come Back For This Shortly!`
                    : feature.numInStock <= 5 && feature.numInStock >= 2
                      ? `There are only ${feature.numInStock} item(s) left!`
                      : feature.numInStock <= 1
                        ? `Only ${feature.numInStock} left!`
                        : `Stock: ${feature.numInStock}`}
                </ProductStock>
                <Button
                  disabled={inStock}
                  onClick={() => dispatch(addProduct(feature))}
                >
                  Add To Cart
              </Button>
              </ProductWrapper>
            );
          })
        )}
      {/* <CategoryPage countryId={countryId.country}/> */}
    </FeatureWrapper>
  );
}

const FeatureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 32px;
  margin: 0 0 0 32px;
`;
const ProductLink = styled(Link)`
  text-decoration: none;
  transition: transform 300ms;

  &:hover {
    transform: scale(1.05);
    transform-origin: center;
  }
`;

const ProductWrapper = styled.div`
  padding: 36px;
  border-radius: 16px;
  box-shadow: 2px 5px 36px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductStock = styled.div`
  color: #333;
  font-size: 18px;
`;

const ProductImage = styled.img`
  border-radius: 12px;
  width: 80%;
`;
const ProductName = styled.h3`
  font-size: 24px;
  color: #333;
  margin-top: 12px;
`;

const ProductPrice = styled.div`
  color: red;
`;

const Button = styled.button`
  background-color: #048ba9;
  color: white;
  padding: 10px;
  font-size: 12px;
  border-radius: 7px;
  cursor: pointer;

  &:disabled {
    background-color: grey;
  }
`;

export default FeaturedProducts;
