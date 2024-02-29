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
import { notify } from "../../Notify";
import { AxiosError } from "axios";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.users)
  
  
  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(signIn(values)).unwrap();
        navigate("/profile");
      } catch(err: any) {        
        if (err.code === "ERR_BAD_REQUEST") {
          notify('Wrong email or password', "error")
        }
      } finally {
        setSubmitting(false)
      }

    },
  });
  return (
    <CustomPageDiv>
      <CustomImg src={logo} alt="" className="picture" />
      <CustomFormDiv>
        <CustomTitle>Log In</CustomTitle>
        <Grid container>
          <CustomGrid >
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
                  errorMessage= {signInForm.errors.email}
                />
            
                <FormInput
                  labelText="Password"
                  helperText="Enter your password"
                  inputStyle="password"
                  inputName="password"
                  changeHandler={signInForm.handleChange}
                  blurHandler={signInForm.handleBlur}
                  fieldValue={signInForm.values.password}
                  {...signInForm.getFieldProps("password")}
                  errorMessage={signInForm.errors.password}
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


const CustomGrid = styled(Grid)`
  width: 413px;
   @media (min-width: 835px) and (max-width: 1279px){
    width: 392px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    width: 290px;
  }
`

const CustomPageDiv = styled.div`
 
    display: flex;
    flex-direction: row-reverse;
    padding: 10px 80px 80px 80px;
    gap: 255px;
    justify-content: center;
  
  
  @media (min-width: 835px) and (max-width: 1279px){
      width: 804px;
      gap: 20px;
      padding: 95px 17px 104px 15px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    flex-direction: column-reverse;
    gap: 60px;
    padding: 0;
  }
`;

const CustomFormDiv = styled.div`
  
    margin: 120px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  
  @media (min-width: 835px) and (max-width: 1279px){
    margin: 0;
  }
  @media (min-width: 320px) and (max-width: 834px){
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
  
  @media (min-width: 835px) and (max-width: 1279px){
    font-family: Poppins;
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0 0 50px 0;
  }
  @media (min-width: 320px) and (max-width: 834px){
    font-family: Poppins;
font-size: 18px;
font-weight: 700;
line-height: 27px;
letter-spacing: 0em;
text-align: left;

    margin: 0 0 30px 0;
  }
`;

const CustomImg = styled.img`
 
    margin-top: 90px;
    width: 612px;
    height: 522px;
  
  
  @media (min-width: 835px) and (max-width: 1279px){
    margin: 0;
    width: 390px;
    height: 333px;
  }
  @media (min-width: 320px) and (max-width: 834px){
    margin: 0;
    width: 290px;
    height: 247px;
  }
`;
export default SignInPage;
