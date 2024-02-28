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
import FormInput from "../Components/FormInput";

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

  };

  const handleNameChange = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setChangeName(!changeName);
    setChangePass(false);

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
      <>
        <CustomAvatar
          src={"http://localhost:5000/" + user?.avatar?.avatarName ?? userPhoto}
          alt=""
        />
        <CustomLabel>
          <CustomLogo src={photoLogo} alt="" />
          <VisuallyHiddenInput type="file" onChange={handleAddAvatar} />
        </CustomLabel>
      </>
      <div>
        <CustomTextDiv>
          <CustomText>Personal information</CustomText>
          <Link component="button" onClick={handleNameChange} color="#8D9F4F">
            Change information
          </Link>
        </CustomTextDiv>
        <Box component="form" onSubmit={nameChange.handleSubmit} sx={{paddingBottom: "40px", paddingTop: "30px"}}>
          <CustomInputDiv>
            <FormInput
              labelText="Your name"
              inputStyle="email"
              disabled={!changeName}
              changeHandler={nameChange.handleChange}
              blurHandler={nameChange.handleBlur}
              fieldValue={nameChange.values.userName}
              {...nameChange.getFieldProps("email")}
              errorMessage={nameChange.errors.userName}
            />

            <CustomTextField label="Your email" name="email" disabled={true}/>
          </CustomInputDiv>
          {changeName && (
            <FormButton buttonText="Confirm" buttonType="submit" />
          )}
        </Box>
        <CustomTextDiv>
          <CustomText>Password</CustomText>
          <Link
            component="button"
            onClick={handlePasswordChange}
            color="#8D9F4F"
          >
            Change password
          </Link>
        </CustomTextDiv>
        <CustomInputDiv>
          <Box component="form" onSubmit={passwordChange.handleSubmit} sx={{paddingTop: '20px'}}>
            <CustomInputDiv>
              <FormInput
                labelText={changePass ? "Old password" : "Your password"}
                inputStyle="password"
                inputName="oldPassword"
                disabled={!changePass}
                changeHandler={passwordChange.handleChange}
                blurHandler={passwordChange.handleBlur}
                fieldValue={passwordChange.values.oldPassword}
                {...passwordChange.getFieldProps("oldPassword")}
                errorMessage={passwordChange.errors.oldPassword}
              />
            </CustomInputDiv>
            {changePass && (
              <>
                <CustomInputDiv>
                  <FormInput
                    labelText="New password"
                    helperText="Enter your password"
                    inputStyle="password"
                    inputName="newPassword"
                    disabled={!changePass}
                    changeHandler={passwordChange.handleChange}
                    blurHandler={passwordChange.handleBlur}
                    fieldValue={passwordChange.values.newPassword}
                    {...passwordChange.getFieldProps("newPassword")}
                    errorMessage={passwordChange.errors.newPassword}
                  />
                  <FormInput
                    labelText="Password replay"
                    helperText="Repeat your password without errors"
                    inputStyle="password"
                    inputName="passwordToCompare"
                    changeHandler={passwordChange.handleChange}
                    blurHandler={passwordChange.handleBlur}
                    fieldValue={passwordChange.values.passwordToCompare}
                    {...passwordChange.getFieldProps("passwordToCompare")}
                    errorMessage={passwordChange.errors.passwordToCompare}
                  />
                </CustomInputDiv>
                <FormButton buttonText="Confirm" buttonType="submit" />
              </>
            )}
          </Box>
        </CustomInputDiv>
      </div>
    </CustomProfileDiv>
  );
};

const CustomText = styled(Typography)`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;

`

const CustomLabel = styled.label`
  width: 128px
`;

const VisuallyHiddenInput = styled.input`
  visibility: hidden;
`;

const CustomProfileDiv = styled.div`
  display: flex;
  width: 1280px;

  //justify-content: space-around;
  padding: 60px 0 110px 0;
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
`;

const CustomAvatar = styled.img`
  width: 305px;
  height: 305px;
  border-radius: 16px;
`;

const CustomLogo = styled.img`
  z-index: 9999;
  position: relative;
  top: 240px;
  right: 65px;
`;

const CustomTextField = styled(TextField)`
  border: none;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #f0f4ef;
  text-decoration-color: #344966;
  & .MuiTextField-root {
    color: #344966;
  }
`;



export default ProfilePage;
