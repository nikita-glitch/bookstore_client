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
          <img src={cartLogo} alt=""/>
        </Link>
        <Link to={"/favorite/" + user.favorite.id}>
          <img src={favoriteLogo} alt=""/>
        </Link>
        <Link to={"/profile"}>
          <img src={profileLogo} alt=""/>
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
  background-color: #344966;
  width: 231px;
  height: 44px;
  padding: 10px, 50px, 10px, 50px;
  border-radius: 16px;
  gap: 10px;
  margin-left: 98px;
`;

const ActionPanelDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 198px;
  margin-left: 127px;
`

const ActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 198px;
`

export default ActionPanel;
