import logo from "../../Logos/person1.svg";
import FormInput from "../../Components/FormInput";
import { Typography, Grid, Box } from "@mui/material";
import { useFormik } from "formik";
import styled from "styled-components";
import FormButton from "../../Components/FormButton";
import { signInSchema } from "../../validationSchemas/authSchemas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../store/userSlice";
import { AppDispatch } from "../../store/store";
import { notify } from "../../Notify";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(signInThunk(values)).unwrap();
        navigate("/profile");
      } catch (err: any) {
        if (err.code === "ERR_BAD_REQUEST") {
          notify("Wrong email or password", "error");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <CustomPageDiv>
      <CustomImg src={logo} alt="" className="picture" />
      <CustomFormDiv>
        <CustomTitle>Log In</CustomTitle>
        <Grid container>
          <CustomGrid>
            <Box>
              <Box component="form" onSubmit={signInForm.handleSubmit}>
                <FormInput
                  labelText="Email"
                  helperText="Enter your email"
                  inputStyle="email"
                  inputName="email"
                  changeHandler={signInForm.handleChange}
                  blurHandler={signInForm.handleBlur}
                  fieldValue={signInForm.values.email}
                  errorMessage={signInForm.errors.email}
                  errors={signInForm.errors.email}
                  touched={signInForm.touched.email}
                  {...signInForm.getFieldProps("email")}
                />
                <FormInput
                  labelText="Password"
                  helperText="Enter your password"
                  inputStyle="password"
                  inputName="password"
                  changeHandler={signInForm.handleChange}
                  blurHandler={signInForm.handleBlur}
                  fieldValue={signInForm.values.password}
                  errorMessage={signInForm.errors.password}
                  errors={signInForm.errors.password}
                  touched={signInForm.touched.password}
                  {...signInForm.getFieldProps("password")}
                />
                <FormButton buttonType="submit" buttonText="Log In" />
              </Box>
            </Box>
          </CustomGrid>
        </Grid>
      </CustomFormDiv>
    </CustomPageDiv>
  );
};

export default SignInPage;

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
    width: 100%;
    margin: 0;
    padding-top: 20px;
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
