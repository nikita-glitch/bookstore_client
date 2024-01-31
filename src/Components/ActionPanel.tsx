import { Button } from "@mui/material";
import * as React from "react";

const ActionPanel = () => {
  const handleLoginButtonClick = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  return (
    <Button
      id="loginButton"
      variant="contained"
      onClick={handleLoginButtonClick}
    >
      Log In/ Sign Up
    </Button>
  );
};

export default ActionPanel;
