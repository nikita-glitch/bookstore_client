import logo from "../../Logos/person1.svg";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import FormInput from "../../Components/FormInput";
import FormButton from "../../Components/FormButton";
import styled from "styled-components";
import { signUpSchema } from "../../validationSchemas/authSchemas";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signUpThunk } from "../../store/userSlice";
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
        const response = await dispatch(signUpThunk(values)).unwrap();
        notify(response.data.message, "succsess");
        navigate("/profile");        
      } catch (err: any) {
        console.log('>>>ERR', err);
        
        notify(err.message, "error");
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
        <CustomGrid>
          <Box component="form" onSubmit={signUpForm.handleSubmit}>
            <FormInput
              labelText="Email"
              helperText="Enter your email"
              inputStyle="email"
              inputName="email"
              changeHandler={signUpForm.handleChange}
              fieldValue={signUpForm.values.email}
              blurHandler={signUpForm.handleBlur}
              errors={signUpForm.errors.email}
              touched={signUpForm.touched.email}
              errorMessage={signUpForm.errors.email}
              {...signUpForm.getFieldProps("email")}
            />
            <FormInput
              labelText="Password"
              helperText="Enter your password"
              inputStyle="password"
              inputName="password"
              changeHandler={signUpForm.handleChange}
              blurHandler={signUpForm.handleBlur}
              fieldValue={signUpForm.values.password}
              errors={signUpForm.errors.password}
              touched={signUpForm.touched.password}
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
              errors={signUpForm.errors.passwordToCompare}
              touched={signUpForm.touched.passwordToCompare}
              {...signUpForm.getFieldProps("passwordToCompare")}
              errorMessage={signUpForm.errors.passwordToCompare}
            />
            <FormButton buttonType="submit" buttonText="Sign Up" />
          </Box>
        </CustomGrid>
      </CustomFormDiv>
    </CustomPageDiv>
  );
};

export default SignUpPage;

const CustomGrid = styled(Grid)`
  width: 413px;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 392px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
  }
`;

const CustomPageDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 10px 0 80px 0;
  gap: 255px;
  justify-content: center;

  @media (min-width: 835px) and (max-width: 1279px) {
    width: 804px;
    gap: 20px;
    padding: 95px 17px 104px 15px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    flex-direction: column-reverse;
    gap: 60px;
    padding: 0;
  }
`;

const CustomFormDiv = styled.div`
  margin: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 835px) and (max-width: 1279px) {
    margin: 0;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    margin: 0;
    padding-top: 20px;
    width: 100%;
  }
`;

const CustomTitle = styled(Typography)`
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
  margin: 0 0 60px 0;

  @media (min-width: 835px) and (max-width: 1279px) {
    font-size: 32px;
    line-height: 48px;
    letter-spacing: 0em;
    margin: 0 0 50px 0;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0em;
    margin: 0 0 30px 0;
  }
`;

const CustomImg = styled.img`
  margin-top: 80px;
  width: 612px;
  height: 522px;

  @media (min-width: 835px) and (max-width: 1279px) {
    margin: 0;
    width: 390px;
    height: 333px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    margin: 0;
    width: 100%;
    height: 247px;
  }
`;
