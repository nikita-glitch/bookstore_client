import * as React from "react";
import hidePass from "../Logos/Hide.svg";
import viewPass from "../Logos/View.svg";
import Mail from "../Logos/Mail.svg";
import styled from "styled-components";
import { InputLabel } from "@mui/material";

const FormInput = (props: {
  labelText: string;
  helperText: string;
  inputStyle: string;
  inputName: string;
}) => {
  const [hiddenPass, setHiddenPass] = React.useState<boolean>(true);

  const [input, setInput] = React.useState<string>("");

  const handlePassHide = () => {
    setHiddenPass(!hiddenPass);
  };

  const setType =
    props.inputStyle === "email" ? "text" : hiddenPass ? "password" : "text";

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(ev.target.value);
  };
  return (
    <>
    <CustomDiv>
      <CustomImg
        className="icon"
        src={
          props.inputStyle === "email"
            ? `${Mail}`
            : hiddenPass
            ? `${hidePass}`
            : `${viewPass}`
        }
        alt=""
        onClick={handlePassHide}
      ></CustomImg>
      <CustomTextField
        placeholder={props.labelText}
        type={setType}
        value={input}
        onChange={handleChange}
        name={props.inputName}
      />
      
    </CustomDiv>
    <CustomInputLabel>{props.helperText}</CustomInputLabel>
    </>
  );
};
const CustomTextField = styled.input`
  width: 365px;
  height: 66px;
  border: none;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #f0f4ef;
  
`;

const CustomImg = styled.img`
  padding: 22px 24px;
  background-color: #f0f4ef;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  color: #b9bac3;
  text-align: center;
  margin-bottom: 9px;
`;

const CustomDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;

`

const CustomInputLabel = styled(InputLabel)`
  margin: 0;
  font-size: 14px;
  color: #344966;
  margin-bottom: 63px;
  text-align: start;
  line-height: 24px;

`
export default FormInput;
