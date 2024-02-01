import logo from "../../Logos/person1.svg";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Formik } from "formik";
import * as React from "react";
import FormInput from "../../Components/FormInput";
import FormButton from "../../Components/FormButton";
import styled from "styled-components";

const SignUpPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      passwordToCompare: data.get("passwordToCompare"),
    });
  };
  return (
    <CustomPageDiv>
      <CustomImg src={logo} alt="" className="picture" />

      <CustomFormDiv>
        <CustomTitle>Sign Up</CustomTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            compare_password: "",
          }}
          //  validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <>
              <Grid container>
                <Grid component={Paper} elevation={0}>
                  <Box>
                    <Box component="form" onSubmit={handleSubmit}>
                      <FormInput
                        labelText="Email"
                        helperText="Enter your email"
                        inputStyle="email"
                        inputName="email"
                      />
                      <FormInput
                        labelText="Password"
                        helperText="Enter your password"
                        inputStyle="password"
                        inputName="password"
                      />
                      <FormInput
                        labelText="Password replay"
                        helperText="Repeat your password without errors"
                        inputStyle="password"
                        inputName="passwordToCompare"
                      />
                      <FormButton buttonType="submit" buttonText="Sign Up" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Formik>
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
@media only screen and (min-width: 321px) and (max-width: 834px) {}
@media only screen and (max-width: 320px) {}
`;

const CustomFormDiv = styled.div`
@media only screen and (min-width: 835px) {
  margin: 120px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
@media only screen and (min-width: 321px) and (max-width: 834px) {}

@media only screen and (max-width: 320px) {}
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
@media only screen and (min-width: 321px) and (max-width: 834px) {}

@media only screen and (max-width: 320px) {}
`;

const CustomImg = styled.img`
@media only screen and (min-width: 835px) {
  margin-top: 90px;
  width: 612px;
  height: 522px;
}
@media only screen and (min-width: 321px) and (max-width: 834px) {}
@media only screen and (max-width: 320px) {}
`;

export default SignUpPage;
