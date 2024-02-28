import * as React from "react";
import hidePass from "../Logos/Hide.svg";
import viewPass from "../Logos/View.svg";
import Mail from "../Logos/Mail.svg";
import styled from "styled-components";
import { Input, InputLabel } from "@mui/material";

const FormInput = (props: {
  labelText: string;
  helperText?: string;
  inputStyle: string;
  inputName?: string;
  disabled?: true | false;
  changeHandler?: (e: React.ChangeEvent<any>) => void;
  blurHandler?: (e: React.ChangeEvent<any>) => void;
  fieldValue?: string;
  errorMessage?: string;
  width?: string
}) => {
  const [hiddenPass, setHiddenPass] = React.useState<boolean>(true);

  const handlePassHide = () => {
    setHiddenPass(!hiddenPass);
  };

  const setType =
    props.inputStyle === "email" ? "text" : hiddenPass ? "password" : "text";

  return (
    <FormDiv>
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
        <CustomInputField
          placeholder={props.labelText}
          type={setType}
          value={props.fieldValue}
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
          id={props.inputName}
          disabled={props.disabled}
          disableUnderline={true}
        />
      </CustomDiv>
      <CustomInputLabel>{props.helperText}</CustomInputLabel>
      {props.errorMessage && (
        <CustomError>{props.errorMessage}</CustomError>
      )}
    </FormDiv>
  );
};
const CustomInputField = styled(Input)`
  width: 100%;
  height: 64px;
  border: none;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #f0f4ef;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
  }
`;

const CustomImg = styled.img`
  padding: 20px;
  background-color: #f0f4ef;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  color: #b9bac3;
  text-align: center;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
  }
`;

const CustomDiv = styled.div`
  display: flex;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
  }
`;
const FormDiv = styled.div`
margin-bottom: 30px;
@media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
  }
`;

const CustomInputLabel = styled(InputLabel)`
  margin: 0;
  display: inline;
  font-size: 14px;
  color: #344966;
  text-align: start;
  line-height: 24px;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
  }
`;

const CustomError = styled(InputLabel)`
  margin: 0;
  font-size: 16px;
  color: #e6120a;
  text-align: start;
  line-height: 24px;
  @media (min-width: 835px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 834px){
  }
`;
export default FormInput;
