import { Button, Rating, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import CommentsList from "./Comments/BookCommentsList";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
//import signInBanner from "../Logos/sing in banner.svg";
import { useNavigate, useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { getBookById } from "../../API/booksAPI";
import { Book } from "../../interfaces/interfaces";

const BookPage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [book, setBook] = useState<Book>()
  const { id }  = useParams()
  const navigate = useNavigate();
  console.log(id);
  
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (id) {
      getBookById(id)
      .then(response =>{
        setBook(response.data)
      })
      }
    }
    return () => {
      ignore = true;
    };
  } , [])
  console.log(book);
  
  const handleBannerClick = () => {
    navigate("/sign-in");
  };
  return (
    <>
      <Bookimg src="" alt=""/>
      <BookTitle>{book?.title}</BookTitle>
      <BookAuthor>{book?.author.author_name}</BookAuthor>
      <Rating
        name="simple-controlled"
        value={book?.rating}
        // onChange={(event, newValue) => {
        // setValue(newValue);
        // }}
      />
      <CustomDescriptionDiv>
        Description
        <DescriptionText>{book?.description}</DescriptionText>
      </CustomDescriptionDiv>
      <div>
        PaperBack
        <CustomButton disabled >Not available</CustomButton>
        HardCover
        <CustomButton>Buy</CustomButton>
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
          <CustomIcon src='' alt="" onClick={handleBannerClick} />
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
