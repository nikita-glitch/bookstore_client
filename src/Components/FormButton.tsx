import { Button } from "@mui/material";
import { click } from "@testing-library/user-event/dist/click";
import * as React from "react";
import styled from "styled-components";

const FormButton = (props: {
  buttonText?: string;
  buttonType: "submit" | "button";
  click?: (ev: React.MouseEvent<any>) => Promise<void>
}) => {
  return (
    <Custombutton type={props.buttonType} onClick={props.click}>{props.buttonText}</Custombutton>
  );
};
const Custombutton = styled(Button)`
  padding: 10px 50px;
  background-color: #344966;
  border-radius: 16px;
  color: #fff;
  margin-bottom: 10px;
  &.MuiButton-root:hover {
    background-color: #344966;
  }
`;
export default FormButton;
