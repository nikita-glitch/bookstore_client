import logo from "../../Logos/person1.svg";
import { Box, Typography } from "@mui/material";
import "./SignUpPage.style.css";
import { Formik } from "formik";
import FormInput from "../../Components/FormInput";

const SignUpPage = () => {
  const handleSubmit = () => {};
  return (
    <div className="signUpPage">
      <img src={logo} alt="" className="picture" />

      <div className="form">
        <Typography component="h1" variant="h4" className="signUpTitle">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            compare_password: "",
          }}
          //  validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <>
              <FormInput
                labelText="Email"
                helperText="Enter your email"
                iconStyle="email"
              />
              <FormInput
                labelText="Password"
                helperText="Enter your password"
                iconStyle="password"
              />
              <FormInput
                labelText="Password replay"
                helperText="Repeat your password without errors"
                iconStyle="password"
              />
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
