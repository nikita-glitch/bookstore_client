import { Button, Rating, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import signInBanner from "../../Logos/sign_in_banner.svg";
import { useNavigate, useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { getBookById, getBookPhoto } from "../../API/booksAPI";
import { Book } from "../../interfaces/interfaces";
import logo from "../../Logos/Group 2.svg";
import BookComment from "./Comments/BookComment";
import { addComment, addToCart, setRating } from "../../API/userAPI";
import { useDispatch } from "react-redux";
import { setBookRating } from "../../store/userSlice";
import { notify } from "../../Notify";
import { postComment } from "../../store/bookSlice";

const BookPage = () => {
  const [input, setInput] = useState<string>('')
  const user = useSelector((state: RootState) => state.users.user);
  const [book, setBook] = useState<Book>();
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams();
  const navigate = useNavigate();
  const books = useSelector((state: RootState) => state.books.book);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (id) {
        getBookById(id).then((response) => {
          setBook(response.data);
        })
      }
    }
    return () => {
      ignore = true;
    };
  }, [id]);

  const getUserRate = () => {
    let value = 0;
    user.rating.map((rate => {
      if (rate.userId === user.id && rate.bookId === id) {
        value = rate.value
      }
    }))
    return value
  }

  const handleTextInputChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(ev.target.value)
  }

  const handleCommentPost = async(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const data = {
      commentText: input, 
      bookId: id
    }
      try {
        await dispatch(postComment(data)).unwrap()
      } catch (error) {
        
      }
  }

  const handleRatingChange = async (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {    
    const data = {
      ratingValue: newValue, 
      bookId: id
    }
      try {
        await dispatch(setBookRating(data)).unwrap()
        //  notify()
      } catch (error) {
        
      }
  };

  const handleBannerClick = (ev: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    navigate("/sign-in");
  };

  const handleCartAddClick = async(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!user.id) {
      navigate("/sign-in");
    } else {
      const respone = await addToCart(id);
      // notify(respone.data.message)
    }    
  }

  return (
    <Page>
      
      <CustomBookDiv>
      {/* {photo} */}
        <Bookimg src={""} alt="" />
        <CustomInfoDiv>
          <BookTitle>{book?.title}</BookTitle>
          <BookAuthor>{book?.author.author_name}</BookAuthor>
          <CustomRatingDiv>
            <CustomLogo src={logo} alt="" />
            <Typography>{book?.bookRating}</Typography>
            <Rating
              name="simple-controlled"
              value={getUserRate()}
              onChange={handleRatingChange}
            />
            <Typography>Rate this book</Typography>
          </CustomRatingDiv>

          <CustomDescriptionDiv>
            Description
            <DescriptionText>{book?.description}</DescriptionText>
          </CustomDescriptionDiv>
          <CustomButtonDiv>
            <div>
              <Typography>PaperBack</Typography>
              <CustomButton disabled>Not available</CustomButton>
            </div>
            <div>
              <Typography>HardCover</Typography>
              <CustomButton onClick={handleCartAddClick}>Buy</CustomButton>
            </div>
          </CustomButtonDiv>
        </CustomInfoDiv>
      </CustomBookDiv>
      <CommentsList>
        <Comments>Comments</Comments>
        {book?.comments.map((comment) => (
          <BookComment {...comment} />
        ))}
      </CommentsList>
      {user.id !== "" ? (
        <TextAreaDiv>
          <TextField
            id="outlined-multiline-static"
            label="Share a comment"
            multiline
            value={input}
            rows={4}
            onChange={handleTextInputChange}
          />
          <CustomButton onClick={handleCommentPost}>Post a comment</CustomButton>
        </TextAreaDiv>
      ) : (
        <>
          <CustomIcon src={signInBanner} alt="" onClick={handleBannerClick} />
        </>
      )}
      <Recomendations>Recommendations</Recomendations>
      <RecomendationsDiv>
        {books.map((bookItem, index) => (
          <>
          {index < 4 &&
            <BookCard key={bookItem.id} {...bookItem} />
          }</>
        ))}
      </RecomendationsDiv>
    </Page>
  );
};

const CustomButtonDiv = styled.div`
  display: flex;
  justify-content: space-around
  ;
`

const CommentsList = styled.div`
  padding: 0 0 0 80px;
`;

const CustomLogo = styled.img``;
const CustomRatingDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 504px;
  justify-content: space-between;
`;

const CustomIcon = styled.img`
  padding: 68px 80px 110px 80px;
  width: 1720px;
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

const Recomendations = styled(Typography)`
  padding: 0 0 0 80px;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const Comments = styled(Typography)`
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
  justify-content: space-between;
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
  display: flex;
  justify-content: space-between;
  padding: 50px 80px 150px 80px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const TextAreaDiv = styled.div`
  padding: 50px 0 0 80px;
  width: 800px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

export default BookPage;
