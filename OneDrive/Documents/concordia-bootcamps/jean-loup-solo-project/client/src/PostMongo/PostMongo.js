import React, { useState } from "react";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     requestSellers,
//     receiveSellers,
//     receiveSellersError,

// } from "../actions";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import styled from "styled-components";

// const PostMongo = () => {
//     const dispatch = useDispatch();
//     const productId = useParams();
//     const oneSeller = useSelector((state) => state.seller.sellers);
//     const state = useSelector((state) => state.seller.status);
//     useEffect(() => {
//         dispatch(requestSellers());
//         fetch(`/sellers`)
//             .then((res) => res.json())
//             .then((data) => {
//                 dispatch(receiveSellers(data));
//             })
//             .catch((error) => {
//                 dispatch(receiveSellersError(error));
//             });
//     }, []);
//     return (
//         <Wrapper>
//             <Header>Seller Page Test</Header>
//             {state === "loading" ? (
//                 <LinearProgress variant="determinate" />
//             ) : (
//                     Object.values(oneSeller).map((seller) => {
//                         // const inStock = seller.numInStock <= 0;
//                         return (
//                             <ProductContainer>
//                                 <div className="imageContainer">
//                                     <ProductImage src={seller.imageSrc}></ProductImage>
//                                 </div>
//                                 <ProductName>{seller.sellerName}</ProductName>
//                                 {/* <ProductPrice>{seller.price}</ProductPrice>
//                                 <ProductCategory>
//                                     Location: {seller.body_location}
//                                 </ProductCategory>
//                                 <ProductCategory>Category: {seller.category}</ProductCategory>
//                                 <ProductCategory>
//                                     {inStock
//                                         ? `We're Out of Stock! Come Back For This Shortly!`
//                                         : seller.numInStock <= 5 && seller.numInStock >= 2
//                                             ? `There are only ${seller.numInStock} item(s) left!`
//                                             : seller.numInStock <= 1
//                                                 ? `Only ${seller.numInStock} left!`
//                                                 : `Stock: ${seller.numInStock}`}
//                                 </ProductCategory>
//                                 <div className="buttonContainer">
//                                     <Button
//                                     // disabled={inStock}
//                                     // onClick={() => dispatch(addSeller(seller))}
//                                     >
//                                         Add To Cart{" "}
//                                     </Button>
//                                 </div> */}
//                             </ProductContainer>
//                         );
//                     })
//                 )}
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//   padding-bottom: 24px;
//   width: 100%;
//   height: 100vh;
//   background-image: url("/woman_with_basket.jpg");
//   background-size: cover;
// `;

// const Header = styled.h1`
//   text-align: center;
//   font-weight: bold;
//   color: #fff;
//   background-color: black;
// `;

// const ProductContainer = styled.div`
//   margin-left: auto;
//   background-color: #fff;
//   opacity: 0.9;
//   margin-right: auto;
//   border: 1px solid black;
//   width: 300px;
//   padding: 30px;
//   &:hover {
//     box-shadow: 2px 4px 24px rgba(0, 0, 0, 0.6);
//   }
//   .imageContainer {
//     display: flex;
//     justify-content: center;
//     background-color: #fff;
//   }
//   .buttonContainer {
//     display: flex;
//     justify-content: center;
//   }
// `;
// const ProductImage = styled.img`
//   width: 80%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ProductName = styled.h3`
//   font-size: 1.5em;
//   font-weight: bold;
//   text-align: center;
//   padding: 20px;
// `;

// const ProductPrice = styled.div`
//   color: red;
//   text-align: center;
// `;
// const ProductCategory = styled.div`
//   color: #333;
//   font-size: 18px;
// `;
// const Button = styled.button`
//   background-color: #048BA9;
//   color: white;
//   padding: 10px;
//   font-size: 12px;
//   border-radius: 7px;
//   cursor: pointer;
//   /* &: disabled {
//     background-color: grey;
//   } */
// `;
// export default PostMongo;
