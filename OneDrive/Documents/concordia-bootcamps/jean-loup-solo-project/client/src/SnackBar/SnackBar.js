import React from "react";
import styled from "styled-components";
const SnackBar = () => {
  return (
    <Message>
      <Success>Purchase Successful. Your vegetable basket will be available at the drop off location.</Success>
      {/* <img src="/green.tractor.jpg"></img> */}
    </Message>
  );
};

const Message = styled.div`
  font-size: 30px;
  color: #fff;
  position: absolute;
  height: 550px;
  width: 850px;
  padding: 50px 50px 50px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
  z-index: 1;
  /* background-image: "/green_tractor.jpg"; */
`;

const Success = styled.div`
  position: absolute;
  color: white;
`;

export default SnackBar;
