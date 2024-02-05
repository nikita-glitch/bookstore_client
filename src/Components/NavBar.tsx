import { Button } from "@mui/material";
import "./NavBar.style.css";
import logo from "../Logos/Group 1.svg";
import SearchBar from "./SearchBar";
import ActionPanel from "./ActionPanel";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <CustomDivNavbar>
      <img src={logo} alt="logo" />
      <NavLink to="/catalog ">
        <CustomCatalogButton>Catalog</CustomCatalogButton>
      </NavLink>
      <SearchBar />
      <ActionPanel />
    </CustomDivNavbar>
  );
};

const CustomDivNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 80px;
`;

const CustomCatalogButton = styled(Button)`
  width: 66px;
  height: 24px;
  background-color: #fff;
  color: #000;
  margin: 0 0 0 128px;
`;
export default NavBar;
