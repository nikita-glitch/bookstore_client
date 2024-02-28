import logo from "../../Logos/person1.svg";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import FormInput from "../../Components/FormInput";
import FormButton from "../../Components/FormButton";
import styled from "styled-components";
import { signUpSchema } from "../../validationSchemas/authSchemas";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { signUp } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { notify } from "../../Notify";

const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordToCompare: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await dispatch(signUp(values)).unwrap();
        notify(response.data.message, "succsess");
        navigate("/profile");
      } catch (err) {
        // notify(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <CustomPageDiv>
      <CustomImg src={logo} alt="" className="picture" />

      <CustomFormDiv>
        <CustomTitle>Sign Up</CustomTitle>
        <Grid container>
          <Grid component={Paper} elevation={0} sx={{ width: '413px' }}>
            <Box>
              <Box component="form" onSubmit={signUpForm.handleSubmit}>
                <FormInput
                  labelText="Email"
                  helperText="Enter your email"
                  inputStyle="email"
                  inputName="email"
                  changeHandler={signUpForm.handleChange}
                  fieldValue={signUpForm.values.email}
                  blurHandler={signUpForm.handleBlur}
                  {...signUpForm.getFieldProps("email")}
                  errorMessage={signUpForm.errors.email}
                />
                <FormInput
                  labelText="Password"
                  helperText="Enter your password"
                  inputStyle="password"
                  inputName="password"
                  changeHandler={signUpForm.handleChange}
                  blurHandler={signUpForm.handleBlur}
                  fieldValue={signUpForm.values.password}
                  {...signUpForm.getFieldProps("password")}
                  errorMessage={signUpForm.errors.password}
                />
                <FormInput
                  labelText="Password replay"
                  helperText="Repeat your password without errors"
                  inputStyle="password"
                  inputName="passwordToCompare"
                  changeHandler={signUpForm.handleChange}
                  blurHandler={signUpForm.handleBlur}
                  fieldValue={signUpForm.values.passwordToCompare}
                  {...signUpForm.getFieldProps("passwordToCompare")}
                  errorMessage={signUpForm.errors.passwordToCompare}
                />
                <FormButton buttonType="submit" buttonText="Sign Up" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomFormDiv>
    </CustomPageDiv>
  );
};

const CustomPageDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 10px 80px 80px 80px;
  gap: 255px;
  justify-content: center;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomFormDiv = styled.div`
  @media only screen and (min-width: 835px) {
    margin: 120px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }

  @media only screen and (max-width: 320px) {
  }
`;

const CustomTitle = styled(Typography)`
  @media only screen and (min-width: 835px) {
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: left;
    margin: 0 0 60px 0;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }

  @media only screen and (max-width: 320px) {
  }
`;

const CustomImg = styled.img`
  @media only screen and (min-width: 835px) {
    margin-top: 90px;
    width: 612px;
    height: 522px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomErrorMessage = styled.div`
  color: tomato;
  margin-bottom: 5px;
`;

export default SignUpPage;
