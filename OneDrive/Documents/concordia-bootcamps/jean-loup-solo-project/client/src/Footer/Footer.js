import React from "react";
import styled from "styled-components";
import { instagram } from "react-icons-kit/feather/instagram";
import { twitter } from "react-icons-kit/feather/twitter";
import { facebook } from "react-icons-kit/feather/facebook";
import { Icon } from "react-icons-kit";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Wrapper>
      <SocialMediaContainer>
        <span>FOLLOW US</span>
        <StyledLink to="#">
          <StyledIcon icon={instagram}></StyledIcon>
        </StyledLink>
        <StyledLink to="#">
          <StyledIcon icon={twitter}></StyledIcon>
        </StyledLink>
        <StyledLink to="#">
          <StyledIcon icon={facebook}></StyledIcon>
        </StyledLink>
      </SocialMediaContainer>
      <CopyRightWrapper>
        <span>@FarmHookMarket</span>
      </CopyRightWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledLink = styled(Link)`
  cursor: pointer;
  &:visited {
    color: inherit;
  }
`;
const CopyRightWrapper = styled.div`
  color: hsl(258deg, 100%, 50%);
  margin-top: 10px;
  span {
    color: hsl(258, 1%, 29%);
  }
`;
const StyledIcon = styled(Icon)`
  margin-left: 10px;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  color: hsl(258deg, 100%, 50%);
  font-weight: bold;
`;

export default Footer;
