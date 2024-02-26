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
    <>
      {user?.id ? (
        <>
        <Link to={"/cart/" + user.cart.id}>
          <img src={cartLogo} alt=""/>
        </Link>
        <Link to={"/favorite/" + user.favorite.id}>
          <img src={favoriteLogo} alt=""/>
        </Link>
        <Link to={"/profile"}>
          <img src={profileLogo} alt=""/>
        </Link>
        </>
      ) : (
        <>
          <Link to={route}>
            <CustomLoginButton
              variant="contained"
              onClick={handleLoginButtonClick}
            >
              Log In/ Sign Up
            </CustomLoginButton>
          </Link>
        </>
        )} 
    </>
  );
};

const CustomLoginButton = styled(Button)`
  background-color: #344966;
  border-radius: 16px;
  width: 230px;
  height: 44px;
  margin-left: 98px;
`;

export default ActionPanel;
