import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestRegionProducts,
  receiveRegionProducts,
  receiveRegionProductsError,
  addProduct,
} from "../actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";

const ProductPage = () => {
  const dispatch = useDispatch();
  const productId = useParams();
  const oneProduct = useSelector((state) => state.product.products);
  let inStock = oneProduct.numInStock <= 0;
  const state = useSelector((state) => state.product.status);
  useEffect(() => {
    dispatch(requestRegionProducts());
    fetch(`/products/detail/${productId.productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        dispatch(receiveRegionProducts(data));
      })
      .catch((error) => {
        dispatch(receiveRegionProductsError(error));
      });
  }, []);
  console.log('oneProduct', oneProduct)
  return (
    <Wrapper>
      <Header>Product Page</Header>
      {state === "loading" ? (
        <LinearProgress variant="determinate" />
      ) : (

          // Object.values(oneProduct).map((product) => {
          //   console.log('product', product)
          // return (

          <ProductContainer>
            <div className="imageContainer">
              <ProductImage src={oneProduct.imageSrc}></ProductImage>
            </div>
            <ProductName>{oneProduct.name}</ProductName>
            <ProductPrice>{oneProduct.price}</ProductPrice>
            <ProductCategory>
              Category: {oneProduct.category}
            </ProductCategory>
            <ProductCategory>Family: {oneProduct.family}</ProductCategory>
            <ProductCategory>
              {inStock
                ? `We're Out of Stock! Come Back For This Shortly!`
                : oneProduct.numInStock <= 5 && oneProduct.numInStock >= 2
                  ? `There are only ${oneProduct.numInStock} item(s) left!`
                  : oneProduct.numInStock <= 1
                    ? `Only ${oneProduct.numInStock} left!`
                    : `Stock: ${oneProduct.numInStock}`}
            </ProductCategory>
            <div className="buttonContainer">
              <Button
                disabled={inStock}
                onClick={() => dispatch(addProduct(oneProduct))}
              >
                Add To Cart{" "}
              </Button>
            </div>
          </ProductContainer>
        )
      }

    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 32px;
    margin: 32px 0; */
  padding-bottom: 24px;
  width: 100%;
  height: 100vh;
  background-image: url("/woman_with_basket.jpg");
  background-size: cover;
`;

const Header = styled.h1`
  text-align: center;
  font-weight: bold;
  color: #fff;
  background-color: black;
`;

const ProductContainer = styled.div`
  margin-left: auto;
  background-color: #fff;
  opacity: 0.9;
  margin-right: auto;
  border: 1px solid black;
  width: 300px;
  padding: 30px;
  &:hover {
    box-shadow: 2px 4px 24px rgba(0, 0, 0, 0.6);
  }
  .imageContainer {
    display: flex;
    justify-content: center;
    background-color: #fff;
  }
  .buttonContainer {
    display: flex;
    justify-content: center;
  }
`;
const ProductImage = styled.img`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductName = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

const ProductPrice = styled.div`
  color: red;
  text-align: center;
`;
const ProductCategory = styled.div`
  color: #333;
  font-size: 18px;
`;
const Button = styled.button`
  background-color: #048BA9;
  color: white;
  padding: 10px;
  font-size: 12px;
  border-radius: 7px;
  cursor: pointer;
  /* &: disabled {
    background-color: grey;
  } */
`;
export default ProductPage;
