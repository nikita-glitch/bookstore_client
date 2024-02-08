import { Button, Rating, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import CommentsList from "./Comments/BookCommentsList";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import signInBanner from "../Logos/sing in banner.svg";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

const BookPage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();
  const handleBannerClick = () => {
    navigate("/sign-in");
  };
  return (
    <>
      <Bookimg src="" alt=""/>
      <BookTitle>{}</BookTitle>
      <BookAuthor>{}</BookAuthor>
      <Rating
        name="simple-controlled"
        value={null}
        // onChange={(event, newValue) => {
        // setValue(newValue);
        // }}
      />
      <CustomDescriptionDiv>
        Description
        <DescriptionText>{}</DescriptionText>
      </CustomDescriptionDiv>
      <div>
        PaperBack
        <CustomButton disabled >Not available</CustomButton>
        HardCover
        <CustomButton></CustomButton>
      </div>
      <div>
        <CommentsList />
      </div>
      {user ? 
        (<TextAreaDiv>
          <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
          <CustomButton>Post a comment</CustomButton>
        </TextAreaDiv>) : (
        <>
          <CustomIcon src={signInBanner} alt="" onClick={handleBannerClick} />
        </>
      )}
      <RecomendationsDiv>
        {/* <BookCard/> */}
      </RecomendationsDiv>
    </>
  );
};

const CustomIcon = styled.img`
  @media only screen and (min-width: 835px) {
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const Bookimg = styled.img``;
const BookTitle = styled(Typography)``;
const BookAuthor = styled(Typography)``;
const CustomDescriptionDiv = styled.div``;
const DescriptionText = styled(Typography)``;
const CustomButton = styled(Button)``;
const RecomendationsDiv = styled.div``;
const TextAreaDiv = styled.div``;

export default BookPage;
