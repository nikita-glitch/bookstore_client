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
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { addUserAvatar, changeUserName } from "../store/userSlice";
import { changePassword } from "../API/userAPI";
import { notify } from "../Notify";

const ProfilePage = () => {
  const [changePass, setChangePass] = React.useState<boolean>(false);
  const [changeName, setChangeName] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.users);

  const handleAddAvatar = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!ev.target.files) {
        return;
      }
      const file = new FormData();
      file.append("file", ev.target.files[0]);
      const response = await dispatch(addUserAvatar(file)).unwrap();
      notify(response.data.message, "succsess");
    } catch (err: any) {
      notify(err.data.message, "error");
    }
  };

  const handlePasswordChange = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setChangePass(!changePass);
    setChangeName(false);
    // passwordChange.errors.oldPassword = "";
    // passwordChange.touched.oldPassword = false;
    // passwordChange.errors.newPassword = "";
    // passwordChange.touched.newPassword = false;
    // passwordChange.errors.passwordToCompare = "";
    // passwordChange.touched.passwordToCompare = false;
  };

  const handleNameChange = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setChangeName(!changeName);
    setChangePass(false);
    // nameChange.errors.userName = "";
    // nameChange.touched.userName = false;
  };

  const nameChange = useFormik({
    initialValues: {
      userName: user!.name,
    },
    //validationSchema: nameChangeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await dispatch(
          changeUserName(values.userName)
        ).unwrap();
        notify(response.message, "succsess");
      } catch (error) {
      } finally {
        setSubmitting(false);
        setChangeName(false);
      }
    },
  });

  const passwordChange = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      passwordToCompare: "",
    },
    //validationSchema: passwordChangeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await changePassword(values);
        notify(response.data.message, "succsess");
      } catch (error) {
        //notify(error.response.data)
      } finally {
        setSubmitting(false);
        setChangePass(false);
        passwordChange.resetForm();
      }
    },
  });
  return (
    <CustomProfileDiv>
      <div>
        <CustomAvatar
          src={"http://localhost:5000/" + user?.avatar?.avatarName ?? userPhoto}
          alt=""
        />
        <label>
          <CustomLogo src={photoLogo} alt="" />
          <VisuallyHiddenInput type="file" onChange={handleAddAvatar} />
        </label>
      </div>
      <div>
        <CustomTextDiv>
          <Typography>Personal information</Typography>
          <Link component="button" onClick={handleNameChange} color="#8D9F4F">
            Change information
          </Link>
        </CustomTextDiv>
        <Box component="form" onSubmit={nameChange.handleSubmit}>
          <CustomInputDiv>
            <CustomTextField
              label="Your name"
              placeholder={user!.name}
              disabled={!changeName}
              id="userName"
              {...nameChange.getFieldProps("userName")}
            />
            {nameChange.touched.userName &&
            nameChange.errors.userName &&
            changeName ? (
              <CustomErrorMessage>
                {nameChange.errors.userName}
              </CustomErrorMessage>
            ) : null}
            <CustomTextField label="Your email" name="email" disabled={true} />
          </CustomInputDiv>
          {changeName && (
            <FormButton buttonText="Confirm" buttonType="submit" />
          )}
        </Box>
        <CustomTextDiv>
          <Typography>Password</Typography>
          <Link
            component="button"
            onClick={handlePasswordChange}
            color="#8D9F4F"
          >
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
                    id="newPassword"
                    type="password"
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
                    type="password"
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
                <FormButton buttonText="Confirm" buttonType="submit" />
              </>
            )}
          </Box>
        </CustomInputDiv>
      </div>
      <div></div>
    </CustomProfileDiv>
  );
};

const VisuallyHiddenInput = styled.input`
  visibility: hidden;
`;

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
