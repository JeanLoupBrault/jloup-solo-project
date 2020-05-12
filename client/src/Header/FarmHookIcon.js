import React from "react";
// import dragon from '../../../public/dragon.png'
import styled from "styled-components";
// const dragonIcon = dragon;
import { Link } from "react-router-dom";
const FarmHookIcon = () => {
  return (
    <>
      {/* <div>Cart Icon</div> */}
      <ImageContainer>
        <Link to="/">
          <img src="/farmHook.png" alt="Dragon" width="40px" height="40px"></img>
        </Link>
      </ImageContainer>
    </>
  );
};

const ImageContainer = styled.div`
  background-color: #ffffff;
`;

export default FarmHookIcon;
