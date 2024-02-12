import { InputBase } from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { settedSearchString } from '../store/bookSlice'

const SearchBar = () => {
  const [input, setInput] = React.useState<string>("");
  const dispatch = useDispatch();
  const handleSearchInput = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(settedSearchString(ev.target.value))
    setInput(ev.target.value);
  };

  return (
    <CustomSearchDiv>
      <CustomSearchIcon />
      <CustomInputBase
        placeholder="Search"
        onChange={handleSearchInput}
        value={input}
      ></CustomInputBase>
    </CustomSearchDiv>
  );
};

const CustomSearchDiv = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
`;

const CustomInputBase = styled(InputBase)`
  height: 64px;
  background-color: #f0f4ef;
  color: #b9bac3;
  padding: 0 509px 0 16px;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
`;

const CustomSearchIcon = styled(SearchIcon)`
  padding: 20px;
  color: #b9bac3;
  background-color: #f0f4ef;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
`;
export default SearchBar;
