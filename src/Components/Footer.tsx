import { MenuList, MenuItem, Typography } from "@mui/material";
import logo from "../Logos/LogoWhite.svg";
import map from "../Logos/map.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Footer = () => {
const user = useSelector((state: RootState) => state.users.user)
  return (
    <CustomFooterDiv>
      <ContentDiv>
      <CustomContactsDiv>
        <CustomCompanyLogo src={logo} alt="logo" />
        <div>
          <CustomText>tranthuy.nute@gmail.com</CustomText>
          <CustomText>(480) 555-0103</CustomText>
        </div>
      </CustomContactsDiv>
      <CustomMenu>
        <Link to={"/"}>
        <CustomMenuItem >Home page</CustomMenuItem>
        </Link>
        <Link to={"/books"}>
        <CustomMenuItem >Catalog</CustomMenuItem>
        </Link>
        <Link to={"/profile"}>
        <CustomMenuItem >My account</CustomMenuItem>
        </Link>
        <Link to={"/cart/" + user?.cart.id}>
        <CustomMenuItem>Cart</CustomMenuItem>
        </Link>
      </CustomMenu>
      <div>
        <CustomText>6391 Elgin St. Celina, Delaware 10299</CustomText>
        <CustomMap src={map} alt="logo" />
      </div>
      </ContentDiv>
    </CustomFooterDiv>
  );
};

const CustomCompanyLogo = styled.img`
  width: 88.3px;
  height: 46px;
  margin-bottom: 40px;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
    margin-bottom: 30px;
  }
`;

const CustomMap = styled.img`
  width: 413px;
  height: 160px;
  @media (min-width: 835px) and (max-width: 1279px){
    width: 392px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 100%;
    height: 160px;
  }
`;

const ContentDiv = styled.div`
  width: 1280px;
  display: flex;
  @media (min-width: 835px) and (max-width: 1279px){
    width: 804px;
  }
  @media (min-width: 320px) and (max-width: 834px){
   
    flex-direction: column;
    width: 100%;
  }
  
`;

const CustomFooterDiv = styled.div`
  padding: 70px 80px;
  background-color: #0d1821;
  display: flex;
  justify-content: center;
  @media (min-width: 835px) and (max-width: 1279px){
    padding: 73px 15px 79px 56px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    flex-direction: column;
    padding: 73px 14px 30px 15px;
  }
`;

const CustomContactsDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
    margin-bottom: 40px;
  }
`;

const CustomText = styled(Typography)`
  color: #f0f4Ef;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  @media (min-width: 835px) and (max-width: 1279px){
    font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;

  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 100%;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

  }
`;

const CustomMenu = styled(MenuList)`
  padding: 0;
  margin: 0 290px 63px 166px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media (min-width: 835px) and (max-width: 1279px){
    width: 95px;
    height: 129px;
    margin: 0;
    padding: 0 42px 60px 26px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 100%;
    margin: 0;
    margin-bottom: 40px;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  color: #F0F4EF;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  @media (min-width: 835px) and (max-width: 1279px){
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

  }
  @media (min-width: 320px) and (max-width: 834px){
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    width: 94px;
    height: 24px;
    padding: 0;
  }
`;
export default Footer;
