import React from "react";
import styled from "styled-components";
const SnackBar = () => {
  return (
    <Message>
      <Success>Access denied. Please log in to have access to this form.</Success>
    </Message>
  );
};

const Message = styled.div`
  font-size: 30px;
  color: #fff;
  position: absolute;
  height: 350px;
  width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
  z-index: 1;
 `;

const Success = styled.div`
  position: absolute;
  color: white;
`;

export default SnackBar;
