import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestCategoriesProducts,
  receiveCategoriesProducts,
  receiveCategoriesProductsError,
  addProduct,
} from "../actions";
import styled from "styled-components";
import { LinearProgress } from "@material-ui/core";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const productType = useParams();
  const categoryProducts = useSelector(
    (state) => state.categoryProduct.categoryProducts
  );
  const state = useSelector((state) => state.categoryProduct.status);
  const categories = useSelector((state) => state.category.categories);
  const currentCountry = useSelector((state) => state.feature.currentCountry);
  useEffect(() => {
    if (currentCountry === null) {
      console.log("x");
    }
    dispatch(requestCategoriesProducts());
    //the issue is: on refresh, the params change and I cannot find "current country"
    fetch(`/products/${currentCountry}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveCategoriesProducts(data.products));
      })
      .catch((error) => {
        dispatch(receiveCategoriesProductsError(error));
      });
  }, [categories]);
  return (
    <FeatureWrapper>
      {state === "loading" ||
        categoryProducts === undefined ||
        currentCountry === null ? (
          <LinearProgress variant="determinate" />
        ) : (
          categoryProducts.map((product) => {
            const inStock = product.numInStock <= 0;
            if (productType.country === product.category) {
              return (
                <>
                  <ProductWrapper>
                    <ProductLink to={`/detail/${product.id}`}>
                      <ProductImage src={product.imageSrc}></ProductImage>
                      <ProductName>{product.name}</ProductName>
                      <ProductCategory>{product.price}</ProductCategory>
                      <ProductPrice>{product.category}</ProductPrice>
                      <ProductPrice>
                        {inStock
                          ? `We're Out of Stock! Come Back For This Shortly!`
                          : product.numInStock <= 5 && product.numInStock >= 2
                            ? `There are only ${product.numInStock} item(s) left!`
                            : product.numInStock <= 1
                              ? `Only ${product.numInStock} left!`
                              : `Stock: ${product.numInStock}`}
                      </ProductPrice>
                    </ProductLink>
                    <Button
                      disabled={inStock}
                      onClick={() => dispatch(addProduct(product))}
                    >
                      Add To Cart{" "}
                    </Button>
                  </ProductWrapper>
                </>
              );
            }
          })
        )}
    </FeatureWrapper>
  );
};

const FeatureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 30px;
  margin: 32px 0;
`;

const ProductWrapper = styled.div`
  padding: 36px;
  border-radius: 16px;
  box-shadow: 2px 5px 36px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductImage = styled.img`
  border-radius: 12px;
  width: 60%;
`;

const ProductName = styled.h2`
  font-size: 24px;
  color: #333;
  margin-top: 12px;
`;
const ProductPrice = styled.div`
  color: #333;
`;
const ProductCategory = styled.div`
  color: #333;
  font-size: 18px;
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

const ProductLink = styled(Link)`
  text-decoration: none;
  transition: transform 250ms;
`;

export default CategoryPage;
