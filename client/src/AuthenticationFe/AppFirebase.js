import React, { useContext } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import AdminForm from '../AdminForm/AdminForm';
import VacationForm from '../VacationForm/VacationForm';
import { AppContext } from './AppContext';

const AppAuth = () => {
  console.log("***HERE: ", useContext(
    AppContext
  ))
  const { appUser, signInWithGoogle, handleSignOut, message } = useContext(
    AppContext
  );
  console.log('appUser ', appUser.displayName)
  let isAdmin = false;
  if (appUser.displayName === "Jean-Loup Brault") {
    isAdmin = true;
  }
  console.log('isAdmin', isAdmin)
  return (
    <StyledPageWrapper>
      <StyledHeader>
        {appUser && appUser.email ? (
          <StyledUserContainer>
            <Avatar src={appUser.photoURL} />
            <p>
              {appUser.displayName} ({appUser.email})
            </p>
            <ButtonOut onClick={handleSignOut}>Sign out</ButtonOut>
            {isAdmin === false}
          </StyledUserContainer>
        ) : (
            <Button onClick={signInWithGoogle}>Sign In</Button>
          )}
      </StyledHeader>
      <StyledContainer>{message}</StyledContainer>
      {(isAdmin)
        ? <AdminForm />
        : handleSignOut
          ? <></>
          : !handleSignOut && <VacationForm />}
    </StyledPageWrapper>
  );
};

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.nav`
  background: #eaeaea;
  padding: 6px 14px;
  min-height: 48px;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const StyledContainer = styled.div`
  background: #fafafa;
  min-height: 400px;
  padding: 14px;
`;

const Button = styled.button`
    width: 180px;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
    background-color: #45a049;
  }
  `
const ButtonOut = styled.button`
width: 180px;
background-color: red;
color: white;
padding: 14px 20px;
margin: 8px 0;
border: none;
border-radius: 4px;
cursor: pointer;
&:hover {
background-color: red;
}
`


export default AppAuth;
