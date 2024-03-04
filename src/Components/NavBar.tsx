import { Button } from "@mui/material";
import logo from "../Logos/Group 1.svg";
import SearchBar from "./SearchBar";
import ActionPanel from "./ActionPanel";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <CustomDivNavbar>
      <BookStoreLogo src={logo} alt="logo" />
        <CustomCatalogButton>
      <Link to={"/books"}>
          Catalog
      </Link>

        </CustomCatalogButton>
      <SearchBar />
      <ActionPanel />
    </CustomDivNavbar>
  );
};

const BookStoreLogo = styled.img`
  @media (min-width: 835px) and (max-width: 1279px) {
    width: 88.43px;
    height: 46px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    grid-area: a;
    width: 62px;
    height: 31px;
  }
`;

const CustomDivNavbar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 125px;
  @media (min-width: 835px) and (max-width: 1279px) {
    width: 804px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    display: grid;
    grid-template-areas:
      "a b c"
      "d d d";
    row-gap: 19px;
    margin: 0;
    /* grid-template-rows: repeat(2, 47px); */
  }
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


&.MuiButton-root {
  text-transform: none;
}
  :visited{
    color: #000;
  }
  @media (min-width: 835px) and (max-width: 1279px) {
    margin: 18px 73px 22px 51px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 58px;
    height: 21px;
    grid-area: b;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    margin: 0;
    padding: 0;
    min-width: auto;
  }
  
`;
export default NavBar;
