import logo from "../../Logos/person1.svg";
import FormInput from "../../Components/FormInput";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { useFormik } from "formik";
import styled from "styled-components";
import FormButton from "../../Components/FormButton";
import { signInSchema } from "../../validationSchemas/authSchemas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/userSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error} = useSelector((state: RootState) => state.users)
  
  const notify = (message: string) => toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });;
  
  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await dispatch(signIn(values));
      setSubmitting(false);
      if (error.response.data) {        
        notify(error.response.data)
      } else {
        navigate("/profile");
      }
    },
  });
  return (
    <CustomPageDiv>
     <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CustomImg src={logo} alt="" className="picture" />
      <CustomFormDiv>
        <CustomTitle>Sign In</CustomTitle>
        <Grid container>
          <Grid component={Paper} elevation={0}>
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
                  {...signInForm.getFieldProps("email")}
                />
                {signInForm.touched.email && signInForm.errors.email ? (
                  <CustomErrorMessage>
                    {signInForm.errors.email}
                  </CustomErrorMessage>
                ) : null}
                <FormInput
                  labelText="Password"
                  helperText="Enter your password"
                  inputStyle="password"
                  inputName="password"
                  changeHandler={signInForm.handleChange}
                  blurHandler={signInForm.handleBlur}
                  fieldValue={signInForm.values.password}
                  {...signInForm.getFieldProps("password")}
                />
                {signInForm.touched.password && signInForm.errors.password ? (
                  <CustomErrorMessage>
                    {signInForm.errors.password}
                  </CustomErrorMessage>
                ) : null}
                <FormButton buttonType="submit" buttonText="Sign In" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomFormDiv>
    </CustomPageDiv>
  );
};

const CustomErrorMessage = styled.div`
  color: tomato;
  margin-bottom: 5px;
`;

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
export default SignInPage;
