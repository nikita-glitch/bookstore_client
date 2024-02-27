import { Button } from "@mui/material";
import logo from "../Logos/Group 1.svg";
import SearchBar from "./SearchBar";
import ActionPanel from "./ActionPanel";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    
    <CustomDivNavbar>
      <img src={logo} alt="logo" />
      <Link to={"/books"}>
        <CustomCatalogButton >Catalog</CustomCatalogButton>
      </Link>
      <SearchBar />
      <ActionPanel />
    </CustomDivNavbar>
    
  );
};

const CustomDivNavbar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 125px;
`;

const CustomCatalogButton = styled(Button)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  background-color: #fff;
  color: #000;
  width: 66px;
  height: 24px;
  margin: 18px 43px 22px 128px;
`;
export default NavBar;
