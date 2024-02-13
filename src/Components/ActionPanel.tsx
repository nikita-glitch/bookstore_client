import { Button } from "@mui/material";
import * as React from "react";
import profileLogo from "../Logos/button_user profile.svg";
import cartLogo from "../Logos/button_cart.svg";
import favoriteLogo from "../Logos/button_save.svg";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../store/store";

const ActionPanel = () => {
  const [route, setRoute] = React.useState<string>("sign-in");
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.users.user);
  console.log(user);
  
  const handleLoginButtonClick = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (route === "sign-in") {
      setRoute("sign-up");
    } else {
      setRoute("sign-in");
    }
  };
  const handleProfileClick = (
    ev: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/profile");
  };
  const handleFavoriteClick = (
    ev: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/favorite");
  };
  const handleCartClick = (
    ev: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/cart");
  };
  return (
    <>
      {user.id !== undefined && user.id !== ""  ? (
        <>
          <img src={cartLogo} alt="" onClick={handleCartClick} />
          <img src={favoriteLogo} alt="" onClick={handleFavoriteClick} />
          <img src={profileLogo} alt="" onClick={handleProfileClick} />
        </>
      ) : (
        <>
          <NavLink to={route}>
            <CustomLoginButton
              variant="contained"
              onClick={handleLoginButtonClick}
            >
              Log In/ Sign Up
            </CustomLoginButton>
          </NavLink>
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
