import { Button } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ActionPanel = () => {
  const [route, setRoute] = React.useState<string>("sign-in");
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
    <NavLink to={route}>
      <CustomLoginButton
        variant="contained"
        onClick={handleLoginButtonClick}
      >
        Log In/ Sign Up
      </CustomLoginButton>
    </NavLink>
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
