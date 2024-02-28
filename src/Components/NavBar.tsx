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
      <Link to={"/books"}>
        <CustomCatalogButton >Catalog</CustomCatalogButton>
      </Link>
      <SearchBar />
      <ActionPanel />
    </CustomDivNavbar>
    
  );
};

const BookStoreLogo = styled.img`

  @media (min-width: 835px) and (max-width: 1279px){
    width: 88.43px;
    height: 46px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 62px;
    height: 31px;
  }
`

const CustomDivNavbar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 125px;
  @media (min-width: 835px) and (max-width: 1279px){
    width: 804px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 290px;
    display: grid;
    grid-auto-flow:  row  dense;
    grid-template-rows: repeat(2, 47px);
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
  @media (min-width: 835px) and (max-width: 1279px){
    margin: 18px 73px 22px 51px;

  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 58px;
    height: 21px;
    margin:0 18px;
  }
`;
export default NavBar;
