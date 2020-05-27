import React from "react";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { getStoreProductArray } from "../reducers/cart-reducer";

import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { useSelector } from "react-redux";


const CartIcon = () => {
  const productQuantity = useSelector((state) => {
    const productItems = Object.values(state.cart);
    return productItems.reduce((acc, item) => {
      const stringtoNum = parseFloat(item.quantity);
      return stringtoNum + acc;
    }, 0);
  });

  return (
    <>
      <LinkToCart to={"/cart"}>
        {productQuantity > 0 ? (
          <NumProducts>{productQuantity}</NumProducts>
        ) : (
            <></>
          )}
        <Icon icon={shoppingCart} size={30}></Icon>
      </LinkToCart>
    </>
  );
};

const NumProducts = styled.div`
  margin-left: 10px;
  display: flex;
  align-content: center;
  height: 15px;
  width: 15px;
  font-size: 12px;
  position: relative;
  margin-right: 6px;
  display: inherit;
  padding-bottom: 20px;
  padding-left: 4px;

  border-radius: 50%;
  background-color: #e28181;
  color: white;
`;
const LinkToCart = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

export default CartIcon;
