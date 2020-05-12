import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ErrorPage from "../ErrorPage/ErrorPage";
import {
  requestRegions,
  receiveRegions,
  receiveRegionsError,
} from "../actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const DropDown = () => {
  const dispatch = useDispatch();
  const regionsStatus = useSelector((state) => state.region.status);
  const regionList = useSelector((state) => state.region.regions);
  const [regionValue, setRegionValue] = React.useState("");
  const [isSelected, setIsSelected] = React.useState(false);

  const regionArray = regionList.regions;

  React.useEffect(() => {
    console.log('inUseEffectDropDown')
    dispatch(requestRegions());
    fetch("/regions")
      .then((res) => res.json())

      .then((data) => {
        console.log('FetchDropRes', data)
        dispatch(receiveRegions(data));
        setIsSelected(!isSelected);
      })
      .catch((error) => {
        dispatch(receiveRegionsError(error));
      });
  }, []);
  return (
    <Wrapper>
      <SelectContainer>
        {regionsStatus === "idle" ? (
          <>
            <StyledSelect
              defaultValue=""
              onChange={(ev) => setRegionValue(ev.target.value)}
            >
              <option selected>Please Choose A Region</option>
              {regionArray.map((region) => {
                return <option value={region}>{region}</option>;
              })}
            </StyledSelect>
            {regionList.regions.includes(regionValue) ? (
              <Link to={`products/${regionValue}`}>
                <StyledButton>CONFIRM</StyledButton>
              </Link>
            ) : (
                <Link to={"/"}>
                  <StyledButton>CONFIRM</StyledButton>
                </Link>
              )}
          </>
        ) : (
            <CircularProgress />
          )}
      </SelectContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSelect = styled.select`
  width: 300px;
  height: 40px;
  font-size: 18px;
  option {
    font-size: 18px;
  }
`;
const SelectContainer = styled.div`
  width: 400px;
  background-color: white;
  height: 96px;
  margin-top: 105px;
  margin-right: 560px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const StyledButton = styled.button`
  background: hsl(258deg, 100%, 50%);
  margin-left: 5px;
  font-size: 15px;
  border-radius: 5px;
  color: white;
  width: 100px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
`;

export default DropDown;
