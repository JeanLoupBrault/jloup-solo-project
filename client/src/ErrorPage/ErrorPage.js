import React from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import LandingPage from "../LandingPage/LandingPage";
const ErrorPage = () => {
  return (
    <Wrapper>
      <Redirect to="/">
        <Link to="/">Home Page</Link>
        <LandingPage />
      </Redirect>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 24px;
  width: 100%;
  height: 100vh;
  grid-column: 5 span/6;
  background-image: url("/error_page_bee.png");
  background-size: cover;
`;

export default ErrorPage;
