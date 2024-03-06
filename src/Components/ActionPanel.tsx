import { Button } from "@mui/material";
import * as React from "react";
import profileLogo from "../Logos/button_user profile.svg";
import cartLogo from "../Logos/button_cart.svg";
import favoriteLogo from "../Logos//favorite.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
          <Link to={"/cart/" + user.cart.id} >
            <CustomIcom src={cartLogo} alt="" />
          </Link>
          <Link to={"/favorite/" + user.favorite.id} >
            <CustomIcom src={favoriteLogo} alt="" />
          </Link>
          <Link to={"/profile"} >
            <CustomIcom src={profileLogo} alt="" />
          </Link>
        </ActionsDiv>
      ) : (
        <CustomLoginButton variant="contained" onClick={handleLoginButtonClick}>
          <Link to={route}>Log In/ Sign Up</Link>
        </CustomLoginButton>
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
  &:hover {
    background: #344966;
  }
  :visited {
    color: #f0f4ef;
  }
  &.MuiButton-root {
    text-transform: none;
  }
  @media (min-width: 834px) and (max-width: 1279px) {
    margin-left: 51px;
  }
  @media (min-width: 320px) and (max-width: 833px) {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.75px;
    padding: 10px 17px;
    width: 100%;
    height: 38px;
    margin: 0;
  }
`;

const ActionPanelDiv = styled.div`
  @media (min-width: 834px) and (max-width: 1279px) {}

  @media (min-width: 320px) and (max-width: 833px) {
    width: 100%;
    grid-area: c;
  }
`;

const CustomIcom = styled.img`
  width: 48px;
  height: 48px;

  @media (min-width: 834px) and (max-width: 1279px) {}

  @media (min-width: 320px) and (max-width: 833px) {
    width: 33px;
    height: 32px;
  }
`;

const ActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 27px;
  margin-left: 127px;

  @media (min-width: 834px) and (max-width: 1279px) {
    margin-left: 81px;
  }
  
  @media (min-width: 320px) and (max-width: 833px) {
    width: 135px;
    gap: 0;
    margin: 0;
  }
`;

export default ActionPanel;
