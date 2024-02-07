import { MenuList, MenuItem, Typography } from "@mui/material";
import logo from "../Logos/LogoWhite.svg";
import map from "../Logos/map.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  const handleHomeItemClick = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    navigate('/')
  }
  const handleCatalogItemClick = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    navigate('/')
  }
  const handleProfileItemClick = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    navigate('/profile')
  }
  const handleCartItemClick = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    navigate('/cart')
  }

  return (
    <CustomFooterDiv>
      <CustomContactsDiv>
        <CustomCompanyLogo src={logo} alt="logo" />
        <div>
          <CustomText>tranthuy.nute@gmail.com</CustomText>
          <CustomText>(480) 555-0103</CustomText>
        </div>
      </CustomContactsDiv>
      <MenuList>
        <CustomMenuItem onClick={handleHomeItemClick}>Home page</CustomMenuItem>
        <CustomMenuItem onClick={handleCatalogItemClick}>Catalog</CustomMenuItem>
        <CustomMenuItem onClick={handleProfileItemClick}>My account</CustomMenuItem>
        <CustomMenuItem onClick={handleCartItemClick}>Cart</CustomMenuItem>
      </MenuList>
      <div>
        <CustomText>6391 Elgin St. Celina, Delaware 10299</CustomText>
        <CustomMap src={map} alt="logo" />
      </div>
    </CustomFooterDiv>
  );
};

const CustomCompanyLogo = styled.img`
  width: 88.3px;
  height: 46px;
`;

const CustomMap = styled.img`
  width: 413px;
  height: 160px;
`;

const CustomFooterDiv = styled.div`
  padding: 73px 80px;
  background-color: #0d1821;
  margin-top: 154px;
  display: flex;
  justify-content: space-between;
`;
const CustomContactsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CustomText = styled(Typography)`
  color: #fff;
  font-size: 20px;
  line-height: 30px;
`;

// const CustomMenu = styled.div`
//   background-color: #0d1821;
//   height: 341px;
// `;
const CustomMenuItem = styled(MenuItem)`
  color: #fff;
  font-size: 20px;
  line-height: 30px;
`;
export default Footer;
