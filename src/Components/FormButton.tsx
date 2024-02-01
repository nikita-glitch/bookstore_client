import { Button } from "@mui/material";
import * as React from "react";
import styled from "styled-components";

const FormButton = (props: {
  buttonText: string;
  buttonType: "submit" | "button";
}) => {
  return (
    <Custombutton type={props.buttonType}>{props.buttonText}</Custombutton>
  );
};
const Custombutton = styled(Button)`
  padding: 10px 50px;
  background-color: #344966;
  border-radius: 16px;
  color: #fff;
  
  &.MuiButton-root:hover {
    background-color: #344966;
  }
`;
export default FormButton;
