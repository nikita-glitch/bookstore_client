import logo from "../../Logos/person1.svg";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as React from "react";
import FormInput from "../../Components/FormInput";
import FormButton from "../../Components/FormButton";
import styled from "styled-components";
import { signUpSchema } from "../../validationSchemas/authSchemas";
import { signUp } from "../../API/authAPI";

const SignUpPage = () => {

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordToCompare: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const isEqual = values.password.localeCompare(values.passwordToCompare);
      if (isEqual === 0) {
        await signUp(JSON.stringify(values));
        setSubmitting(false);
      } else {
        alert("Passwords must be equal");
      }
    },
  });
 
  return (
    <CustomPageDiv>
      <CustomImg src={logo} alt="" className="picture" />

      <CustomFormDiv>
        <CustomTitle>Sign Up</CustomTitle>
        <Grid container>
          <Grid component={Paper} elevation={0}>
            <Box>
              <Box component="form" onSubmit={signUpForm.handleSubmit}>
                <FormInput
                  labelText="Email"
                  helperText="Enter your email"
                  inputStyle="email"
                  inputName="email"
                  disabled={false}
                  changeHandler={signUpForm.handleChange}
                  fieldValue={signUpForm.values.email}
                  {...signUpForm.getFieldMeta("email")}
                />
                {signUpForm.touched.email && signUpForm.errors.email ? (
                  <CustomErrorMessage>
                    {signUpForm.errors.email}
                  </CustomErrorMessage>
                ) : null}
                <FormInput
                  labelText="Password"
                  helperText="Enter your password"
                  inputStyle="password"
                  inputName="password"
                  disabled={false}
                  changeHandler={signUpForm.handleChange}
                  fieldValue={signUpForm.values.password}
                  {...signUpForm.getFieldProps("password")}
                />
                {signUpForm.touched.password && signUpForm.errors.password ? (
                  <CustomErrorMessage>
                    {signUpForm.errors.password}
                  </CustomErrorMessage>
                ) : null}
                <FormInput
                  labelText="Password replay"
                  helperText="Repeat your password without errors"
                  inputStyle="password"
                  inputName="passwordToCompare"
                  disabled={false}
                  changeHandler={signUpForm.handleChange}
                  fieldValue={signUpForm.values.passwordToCompare}
                  {...signUpForm.getFieldProps("passwordToCompare")}
                />
                {signUpForm.touched.passwordToCompare &&
                signUpForm.errors.passwordToCompare ? (
                  <CustomErrorMessage>
                    {signUpForm.errors.passwordToCompare}
                  </CustomErrorMessage>
                ) : null}
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
  @media only screen and (min-width: 835px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 10px 80px 80px 80px;
  }
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
