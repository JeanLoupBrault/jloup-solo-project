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

const ProductsPage = () => {
  const dispatch = useDispatch();
  const productId = useParams();
  const manyProducts = useSelector((state) => state.product.products);
  const state = useSelector((state) => state.product.status);
  useEffect(() => {
    dispatch(requestRegionProducts());
    fetch(`/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data:::', data)
        dispatch(receiveRegionProducts(data));
      })
      .catch((error) => {
        dispatch(receiveRegionProductsError(error));
      });
  }, []);

  console.log('manyProducts', manyProducts.data)
  return (<Wrapper>
    <Header>Products</Header>
    {state === "loading" || manyProducts.data === undefined ? (
      <LinearProgress variant="determinate" />
    ) : (

        manyProducts.data.map((_id) => {
          console.log('_id', _id)
          const inStock = _id.numInStock > 0;
          return (
            <ProductContainer>
              <div className="imageContainer">
                <ProductImage src={_id.imageSrc}></ProductImage>
              </div>
              <ProductName>{_id.name}</ProductName>
              <ProductPrice>{_id.price}</ProductPrice>
              {/* <ProductCategory>
                  Location: {product.body_location}
                </ProductCategory> */}
              <ProductCategory>Family: {_id.family}</ProductCategory>
              <ProductCategory>
                {!inStock
                  ? `We're Out of Stock! Come Back For This Shortly!`
                  : _id.numInStock <= 5 && _id.numInStock >= 2
                    ? `There are only ${_id.numInStock} item(s) left!`
                    : _id.numInStock <= 1
                      ? `Only ${_id.numInStock} left!`
                      : `Stock: ${_id.numInStock}`}
              </ProductCategory>
              <div className="buttonContainer">
                <Button
                  disabled={!inStock}
                  onClick={() => dispatch(addProduct(_id))}
                >
                  Add To Cart{" "}
                </Button>
              </div>
            </ProductContainer>
          );
        })
      )}
  </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: right;
  flex-flow: row wrap;
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
  &:disabled {
    background-color: grey;
  }
`;
export default ProductsPage;
