import { InputBase } from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchInput = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    searchParams.set('searchString', ev.target.value)
    setSearchParams(searchParams)
  };

  return (
    <CustomSearchDiv>
      <CustomSearchIcon />
      <CustomInputBase
        placeholder="Search"
        onChange={handleSearchInput}
        value={searchParams.get('searchString')}
      ></CustomInputBase>
    </CustomSearchDiv>
  );
};

const CustomSearchDiv = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  width: 630px;
  @media (min-width: 835px) and (max-width: 1279px){

    width: 247px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 100%;
    grid-area: d;
  }
`;

const CustomInputBase = styled(InputBase)`
  height: 64px;
  background-color: #f0f4ef;
  color: #b9bac3;
  padding: 0 509px 0 0;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  @media (min-width: 835px) and (max-width: 1279px){
    padding: 0 ;
  }
  @media (min-width: 320px) and (max-width: 834px){
    padding: 0 180px 0 0;
    width: 100%;
  }
`;

const CustomSearchIcon = styled(SearchIcon)`
  padding: 20px;
  color: #b9bac3;
  background-color: #f0f4ef;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
  }
`;
export default SearchBar;
