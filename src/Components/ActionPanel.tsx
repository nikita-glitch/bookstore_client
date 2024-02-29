import { Button } from "@mui/material";
import * as React from "react";
import profileLogo from "../Logos/button_user profile.svg";
import cartLogo from "../Logos/button_cart.svg";
import favoriteLogo from "../Logos//favorite.svg";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../store/store";

const ActionPanel = () => {
  const [route, setRoute] = React.useState<string>("sign-in");
  const user = useSelector((state: RootState) => state.users.user);
  
  const handleLoginButtonClick = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (route === "sign-in") {
      setRoute("sign-up");
    } else {
      setRoute("sign-in");
    }
  };

  return (
    <ActionPanelDiv>
      {user?.id ? (
        <ActionsDiv>
        <Link to={"/cart/" + user.cart.id}>
          <CustomIcom src={cartLogo} alt=""/>
        </Link>
        <Link to={"/favorite/" + user.favorite.id}>
          <CustomIcom src={favoriteLogo} alt=""/>
        </Link>
        <Link to={"/profile"}>
          <CustomIcom src={profileLogo} alt=""/>
        </Link>
        </ActionsDiv>
      ) : (
          <Link to={route}>
            <CustomLoginButton
              variant="contained"
              onClick={handleLoginButtonClick}
            >
              Log In/ Sign Up
            </CustomLoginButton>
          </Link>
        )} 
    </ActionPanelDiv>
  );
};

const CustomLoginButton = styled(Button)`
  background: #344966;
  width: 231px;
  height: 44px;
  padding: 10px 50px;
  border-radius: 16px;
  gap: 10px;
  margin-left: 98px;
  &:hover{
    background: #344966;
  }
  @media (min-width: 834px) and (max-width: 1279px){
    margin-left: 51px;
  }
  @media (min-width: 320px) and (max-width: 833px){
    width: 135px;
    height: 36px;
    margin: 0;
  }
`;

const ActionPanelDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 198px;
  @media (min-width: 834px) and (max-width: 1279px){

  }
  @media (min-width: 320px) and (max-width: 833px){
    width: 135px;
  }
`;

const CustomIcom = styled.img`
  width: 48px;
  height: 48px;
  @media (min-width: 834px) and (max-width: 1279px){

  }
  @media (min-width: 320px) and (max-width: 833px){
    width: 32.7px;
  height: 32.7px;
  }
`

const ActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 198px;
  gap: 27px;
  padding-left: 127px;
  @media (min-width: 834px) and (max-width: 1279px){
    padding-left: 81px;
  }
  @media (min-width: 320px) and (max-width: 833px){
    width: 135px;
    padding: 0;
  }
`

export default ActionPanel;
