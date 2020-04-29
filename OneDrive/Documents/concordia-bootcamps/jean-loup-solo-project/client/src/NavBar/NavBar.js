import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  requestCategories,
  receiveCategories,
  receiveCategoriesError,
} from "../actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import CategoryPage from "../CategoryPage/CategoryPage";

const NavBar = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categories = useSelector((state) => state.category.categories);
  const categoriesState = useSelector((state) => state.category.status);

  useEffect(() => {
    dispatch(requestCategories());
    fetch(`/categories/${params.country.replace(" ", "")}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(receiveCategories(data.categories));
      })
      .catch((error) => {
        dispatch(receiveCategoriesError(error));
      });
  }, []);
  return (
    <>
      <NavContainer>
        {categoriesState === "loading" ? (
          <CircularProgress />
        ) : (
            categories.map((category, i) => {
              if (categories.length - 1 === i) {
                return (
                  <>
                    <StyledLink to={`/categories/${category}`}>
                      {category}
                    </StyledLink>
                  </>
                );
              }
              return (
                <>
                  <StyledLink to={`/categories/${category}`}>
                    {category}
                  </StyledLink>
                  <Divider></Divider>
                </>
              );
            })
          )}
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 0.25;
  background-color: white;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0px 0px 7px 7px #67636326;
  margin-top: 10px;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  font-weight: bold;
  /* padding-right: 40px; */
  text-align: center;

  &:hover {
    color: #405cef;
  }
`;

const Divider = styled.div`
  border-right: 2px solid #bababe;
  margin-right: 20px;
  margin-left: 20px;
  &:hover {
    color: #405cef;
  }
`;

export default NavBar;
