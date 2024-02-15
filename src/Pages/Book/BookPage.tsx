import { Button, Rating, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
//import signInBanner from "../Logos/sing in banner.svg";
import { useNavigate, useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { getBookById } from "../../API/booksAPI";
import { Book } from "../../interfaces/interfaces";
import logo from "../../Logos/Group 2.svg";
import BookComment from "./Comments/BookComment";

const BookPage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [book, setBook] = useState<Book>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (id) {
        getBookById(id)
        .then((response) => {
          setBook(response.data);
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleBannerClick = () => {
    navigate("/sign-in");
  };
  return (
    <Page>
      <CustomBookDiv>
        <Bookimg src={book?.photo} alt="" />
        <CustomInfoDiv>
          <BookTitle>{book?.title}</BookTitle>
          <BookAuthor>{book?.author.author_name}</BookAuthor>
          <CustomRatingDiv>
            <CustomLogo src={logo} alt="" />
            <Typography>{book?.rating}</Typography>
            <Rating
              name="simple-controlled"
              value={book?.rating}
              // onChange={(event, newValue) => {
              // setValue(newValue);
              // }}
            />
            <Typography>Rate this book</Typography>
          </CustomRatingDiv>

          <CustomDescriptionDiv>
            Description
            <DescriptionText>{book?.description}</DescriptionText>
          </CustomDescriptionDiv>
          <div>
            PaperBack
            <CustomButton disabled>Not available</CustomButton>
            HardCover
            <CustomButton>Buy</CustomButton>
          </div>
        </CustomInfoDiv>
      </CustomBookDiv>
      <CommentsList>
        <Typography>Comments</Typography>
        {book?.comments.map((comment) =>
        <BookComment {...comment}/>
        )}
      </CommentsList>
      {user ? (
        <TextAreaDiv>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
          />
          <CustomButton>Post a comment</CustomButton>
        </TextAreaDiv>
      ) : (
        <>
          <CustomIcon src="" alt="" onClick={handleBannerClick} />
        </>
      )}
      <RecomendationsDiv>{/* <BookCard/> */}</RecomendationsDiv>
    </Page>
  );
};

const CommentsList = styled.div`
  padding: 0 0 0 80px;
`

const CustomLogo = styled.img``;
const CustomRatingDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 504px;
  justify-content: space-between;
`;

const CustomIcon = styled.img`
  
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const Bookimg = styled.img`
  width: 522px;
  height: 779px;
  border-radius: 16px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const BookTitle = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const BookAuthor = styled(Typography)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  margin-bottom: 30px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomDescriptionDiv = styled.div`
  width: 640px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomBookDiv = styled.div`
  display: flex;
  gap: 130px;
  padding: 60px 80px 110px 80px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const Page = styled.div`
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomInfoDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const DescriptionText = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomButton = styled(Button)`
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const RecomendationsDiv = styled.div`
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const TextAreaDiv = styled.div`
   padding: 50px 0 0 80px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

export default BookPage;
