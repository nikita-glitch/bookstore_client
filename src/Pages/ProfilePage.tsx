import * as React from "react";
import userPhoto from "../Logos/User photo.png";
import photoLogo from "../Logos/button_photo.svg";
import { Box, Link, TextField, Typography } from "@mui/material";
import FormButton from "../Components/FormButton";
import styled from "styled-components";
import { useFormik } from "formik";
import {
  passwordChangeSchema,
  nameChangeSchema,
} from "../validationSchemas/profileChangeSchema";
import { signUp } from "../API/authAPI";

const ProfilePage = () => {
  const [changePass, setChangePass] = React.useState<boolean>(false);
  const [changeName, setChangeName] = React.useState<boolean>(false);

  const handleAddAvatar = (
    ev: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {};

  const handlePasswordChange = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setChangePass(!changePass);
    passwordChange.errors.oldPassword = "";
    passwordChange.touched.oldPassword = false;
    passwordChange.errors.newPassword = "";
    passwordChange.touched.newPassword = false;
    passwordChange.errors.passwordToCompare = "";
    passwordChange.touched.passwordToCompare = false;
  };

  const handleNameChange = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setChangeName(!changeName);
    nameChange.errors.name = "";
    nameChange.touched.name = false;
  };

  const nameChange = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: nameChangeSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const passwordChange = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      passwordToCompare: "",
    },
    validationSchema: passwordChangeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      //await signUp(JSON.stringify(values));
      setSubmitting(false);
    },
  });
  console.log("passwordChange", passwordChange);
  return (
    <CustomProfileDiv>
      <div>
        <CustomAvatar src={userPhoto} alt="" />
        <CustomLogo src={photoLogo} alt="" onClick={handleAddAvatar} />
      </div>
      <div>
        <CustomTextDiv>
          <Typography>Personal information</Typography>
          <Link component="button" onClick={handleNameChange}>
            Change information
          </Link>
        </CustomTextDiv>
        <Box component="form" onSubmit={nameChange.handleSubmit}>
          <CustomInputDiv>
            <CustomTextField
              label="Your name"
              placeholder=""
              id="name"
              {...nameChange.getFieldProps("name")}
              disabled={!changeName}
            />
            {nameChange.touched.name && nameChange.errors.name && changeName ? (
              <CustomErrorMessage>{nameChange.errors.name}</CustomErrorMessage>
            ) : null}
            <CustomTextField
              label="Your email"
              placeholder=""
              name="email"
              disabled={true}
            />
          </CustomInputDiv>
        </Box>
        <CustomTextDiv>
          <Typography>Password</Typography>
          <Link component="button" onClick={handlePasswordChange}>
            Change password
          </Link>
        </CustomTextDiv>
        <CustomInputDiv>
          <Box component="form" onSubmit={passwordChange.handleSubmit}>
            <CustomInputDiv>
              <CustomTextField
                label="Old password"
                placeholder=""
                id="oldPassword"
                disabled={!changePass}
                {...passwordChange.getFieldProps("oldPassword")}
              />
              {passwordChange.touched.oldPassword &&
              passwordChange.errors.oldPassword &&
              changePass ? (
                <CustomErrorMessage>
                  {passwordChange.errors.oldPassword}
                </CustomErrorMessage>
              ) : null}
            </CustomInputDiv>
            {changePass && (
              <>
                <CustomInputDiv>
                  <CustomTextField
                    label="New password"
                    placeholder=""
                    id="newPassword"
                    helperText="Enter your password"
                    {...passwordChange.getFieldProps("newPassword")}
                  />
                  {passwordChange.touched.newPassword &&
                  passwordChange.errors.newPassword &&
                  changePass ? (
                    <CustomErrorMessage>
                      {passwordChange.errors.newPassword}
                    </CustomErrorMessage>
                  ) : null}
                  <CustomTextField
                    label="Password replay"
                    placeholder=""
                    id="passwordToCompare"
                    helperText="Repeat your password without errors"
                    {...passwordChange.getFieldProps("passwordToCompare")}
                  />
                  {passwordChange.touched.passwordToCompare &&
                  passwordChange.errors.passwordToCompare &&
                  changePass ? (
                    <CustomErrorMessage>
                      {passwordChange.errors.passwordToCompare}
                    </CustomErrorMessage>
                  ) : null}
                </CustomInputDiv>
              </>
            )}
            {(changeName || changePass) && (
              <FormButton buttonText="Confirm" buttonType="submit" />
            )}
          </Box>
        </CustomInputDiv>
      </div>
      <div></div>
    </CustomProfileDiv>
  );
};

const CustomProfileDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 60px 205px 110px 80px;
`;

const CustomInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 522px;
`;

const CustomTextDiv = styled.div`
  width: 522px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const CustomAvatar = styled.img`
  width: 305px;
  height: 305px;
  border-radius: 16px;
  margin-right: 70px;
`;

const CustomLogo = styled.img`
  z-index: 9999;
  position: relative;
  bottom: 20px;
  right: 138px;
`;

const CustomTextField = styled(TextField)`
  border: none;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #f0f4ef;
  margin-bottom: 20px;
  text-decoration-color: #344966;
  & .MuiTextField-root {
    color: #344966;
  }
`;

const CustomErrorMessage = styled.div`
  color: tomato;
  margin-bottom: 5px;
`;

export default ProfilePage;
