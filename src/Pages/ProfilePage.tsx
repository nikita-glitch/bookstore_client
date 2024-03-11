import * as React from "react";
import userPhoto from "../Logos/User photo.png";
import photoLogo from "../Logos/button_photo.svg";
import { Box, Link, Typography } from "@mui/material";
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
import { BASE_URL } from "../utils/constants";

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
      
      notify(response.message, "succsess");
    } catch (err: any) {
      notify(err.data.message, "error");
    }
  };

  const handlePasswordChange = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setChangePass(!changePass);
    setChangeName(false);
    passwordChange.resetForm();
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
    validationSchema: nameChangeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await dispatch(
          changeUserName(values.userName)
        ).unwrap();
        notify(response.message, "succsess");
      } catch (error: any) {
        notify(error.response.data, "error");
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
    validationSchema: passwordChangeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await changePassword(values);
        notify(response.data.message, "succsess");
      } catch (error: any) {
        notify(error.response.data, "error");
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
        <PersonInfoBox>
          <Box component="form" onSubmit={nameChange.handleSubmit}>
            <CustomInputDiv>
              <FormInput
                labelText="Your name"
                inputStyle="user"
                inputName="userName"
                disabled={!changeName}
                changeHandler={nameChange.handleChange}
                blurHandler={nameChange.handleBlur}
                fieldValue={nameChange.values.userName}
                errorMessage={nameChange.errors.userName}
                errors={nameChange.errors.userName}
                touched={nameChange.touched.userName}
                {...nameChange.getFieldProps("userName")}
              />
              <FormInput
                labelText="Your email"
                inputStyle="email"
                fieldValue={user?.email}
                disabled={true}
              />
            </CustomInputDiv>
            {changeName && (
              <FormButton buttonText="Confirm" buttonType="submit" />
            )}
          </Box>
        </PersonInfoBox>
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
          <PassBox>
            <Box component="form" onSubmit={passwordChange.handleSubmit}>
              <FormInput
                labelText={changePass ? "Old password" : "Your password"}
                inputStyle="password"
                inputName="oldPassword"
                disabled={!changePass}
                changeHandler={passwordChange.handleChange}
                blurHandler={passwordChange.handleBlur}
                fieldValue={passwordChange.values.oldPassword}
                errorMessage={passwordChange.errors.oldPassword}
                errors={passwordChange.errors.newPassword}
                touched={passwordChange.touched.newPassword}
                {...passwordChange.getFieldProps("oldPassword")}
              />
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
                      errorMessage={passwordChange.errors.newPassword}
                      errors={passwordChange.errors.newPassword}
                      touched={passwordChange.touched.newPassword}
                      {...passwordChange.getFieldProps("newPassword")}
                    />
                    <FormInput
                      labelText="Password replay"
                      helperText="Repeat your password without errors"
                      inputStyle="password"
                      inputName="passwordToCompare"
                      changeHandler={passwordChange.handleChange}
                      blurHandler={passwordChange.handleBlur}
                      fieldValue={passwordChange.values.passwordToCompare}
                      errorMessage={passwordChange.errors.passwordToCompare}
                      errors={passwordChange.errors.passwordToCompare}
                      touched={passwordChange.touched.passwordToCompare}
                      {...passwordChange.getFieldProps("passwordToCompare")}
                    />
                  </CustomInputDiv>
                  <FormButton buttonText="Confirm" buttonType="submit" />
                </>
              )}
            </Box>
          </PassBox>
        </CustomInputDiv>
      </div>
    </CustomProfileDiv>
  );
};

export default ProfilePage;

const PersonInfoBox = styled(Box)`
  padding: 30px 0 0 0;

  @media (min-width: 835px) and (max-width: 1279px) {
    padding-top: 20px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const PassBox = styled(Box)`
  padding-top: 20px;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const CustomText = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const CustomLabel = styled.label`
  width: 128px;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 20px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    height: 30px;
    width: 100%;
  }
`;

const VisuallyHiddenInput = styled.input`
  visibility: hidden;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const CustomProfileDiv = styled.div`
  display: flex;
  width: 1280px;
  padding: 60px 0 83px 0;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 804px;
    padding: 59px 0 105px 0;
    gap: 0;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    flex-direction: column;
    width: 100%;
    padding: 35px 0 30px 0;
  }
`;

const CustomInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 522px;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 529px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    margin-bottom: 40px;
    width: 100%;
  }
`;

const CustomTextDiv = styled.div`
  width: 522px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 529px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const CustomAvatar = styled.img`
  width: 305px;
  height: 305px;
  border-radius: 16px;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 255px;
    height: 255px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 290px;
    height: 290px;
  }
`;

const CustomLogo = styled.img`
  z-index: 9999;
  position: relative;
  top: 240px;
  right: 65px;
  cursor: pointer;
  @media (min-width: 835px) and (max-width: 1279px) {
    top: 200px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    top: -70px;
    left: 230px;
  }
`;

// const CustomTextField = styled(TextField)`
//   border: none;
//   border-bottom-right-radius: 16px;
//   border-top-right-radius: 16px;
//   background-color: #f0f4ef;
//   text-decoration-color: #344966;
//   & .MuiTextField-root {
//     color: #344966;
//   }
//   @media (min-width: 835px) and (max-width: 1279px) {
//   }
//   @media (min-width: 320px) and (max-width: 834px) {
//   }
// `;
