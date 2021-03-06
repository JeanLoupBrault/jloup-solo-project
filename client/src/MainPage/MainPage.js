import React from "react";
import NavBar from "../NavBar";
import styled from "styled-components";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

const MainPage = () => {
  return (

    <Wrapper>
      {/* <NavBar /> */}
      <BgWrapper>
        <BgImage src="/child_grape.png" />
        <BgMessageDiv2>

        </BgMessageDiv2>
        <BgMessage>
          <h1>Fresh fruits and vegetables from local farms with Farm Hook Market</h1>
        </BgMessage>
      </BgWrapper>
      {/* <FeaturedProductsLabel>
        <h2>FLASH SALE</h2>
      </FeaturedProductsLabel>
      <FeaturedProducts /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
width: 100%;
  height: 100vh;
  `;

const BgImage = styled.img`
width: 100%;
height: 300px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  background-image: 'child_grape.png';
`;
const BgWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  h1 {
    padding: 10px;
  }
`;

const BgMessage = styled.div`
  width: 467.5px;
  color: white;
  height: 132px;
  left: 267px;
  top: 328px;
  position: absolute;
  background: rgba(5, 19, 48, 0.5);
`;
const BgMessageDiv2 = styled.div`
  position: absolute;
  width: 467.5px;
  height: 132px;
  left: 256px;
  top: 317px;
  background: rgba(4, 139, 169, 0.5);
`;

const FeaturedProductsLabel = styled.div`
  background-color: #c00f0f;
  color: #ffe3af;
  width: 200px;
  height: 40px;
  transform: skew(-20deg);
  h2 {
    text-align: center;
    padding: 2px;
  }
  margin-left: 20px;
`;


export default MainPage;
