import {
  Button,
  ButtonBase,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import signInBanner from "../../Logos/sign_in_banner.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { getBookRating } from "../../API/booksAPI";
import { Book, Comments } from "../../interfaces/interfaces";
import logo from "../../Logos/Group 2.svg";
import BookComment from "./Comments/BookComment";
import { useDispatch } from "react-redux";
import { addBookToCart, setBookRating } from "../../store/userSlice";
import { notify } from "../../Notify";
import { getBook, postComment } from "../../store/bookSlice";
import FormButton from "../../Components/FormButton";
import { ArrowBack } from "@mui/icons-material";

const BookPage = () => {
  const [input, setInput] = useState<string>("");
  const [rating, setRatings] = useState<number>();
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.users!.user!);
  const books = useSelector((state: RootState) => state.books.book);
  const currentBook = useSelector((state: RootState) =>
    state.books.book?.find((elem) => elem.id === id)
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getBook());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      getBookRating(id).then((response) => {
        setRatings(response.data);
      });
    }
  }, [user?.rating, id]);

  const getUserRate = () => {
    if (!user) {
      return 0;
    }
    const rate = user?.rating?.find(
      (rate) => rate.userId === user!.id && rate.bookId === id
    );    
    return rate?.value;
  };

  const handleTextInputChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(ev.target.value);
  };

  const handleCommentPost = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const response = await dispatch(
      postComment({
        commentText: input,
        bookId: id,
      })
    ).unwrap();
    notify(response.data.message, "succsess");
    setInput("");
  };

  const handleRatingChange = async (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (!newValue) {
      return;
    }
    const { res } = await dispatch(
      setBookRating({
        ratingValue: newValue,
        bookId: id,
      })
    ).unwrap();    
    notify(res.message, "succsess");
  };

  const handleCartAddClick = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!user?.id) {
      navigate("/sign-in");
      return;
    }
    const response = await dispatch(addBookToCart(id)).unwrap();
    notify(response.data.message, "succsess");
  };

  return (
    <Page>
      <CustomBookDiv>
        <Bookimg
          src={"http://localhost:5000/" + currentBook?.photos?.photo!}
          alt=""
        />
        <CustomInfoDiv>
          <BookTitle>{currentBook?.title}</BookTitle>
          <BookAuthor>{currentBook?.author.author_name}</BookAuthor>
          <CustomRatingDiv>
            <RatingValueDiv>
            <CustomLogo src={logo} alt="" />
            <CustomRate>{rating ?? 0}</CustomRate>
            </RatingValueDiv>

            <CustomRating
              name="simple-controlled"
              disabled={user ? false : true}
              value={getUserRate()}
              onChange={handleRatingChange}
            />
            <CustomRateText>Rate this book</CustomRateText>
          </CustomRatingDiv>
          <CustomDescriptionDiv>
            <CustomDescription>Description</CustomDescription>
            <DescriptionText>{currentBook?.description}</DescriptionText>
          </CustomDescriptionDiv>
          <CustomButtonDiv>
            <div>
              <CustomButtonText>Paperback</CustomButtonText>
              <CustomButton disabled>Not available</CustomButton>
            </div>
            <div>
              <CustomButtonText>Hardcover</CustomButtonText>
              <CustomButton onClick={handleCartAddClick}>
                ${currentBook?.price} USD
              </CustomButton>
            </div>
          </CustomButtonDiv>
        </CustomInfoDiv>
      </CustomBookDiv>
      <CommentsList>
        <Comment>Comments</Comment>
        {currentBook?.comments &&
          currentBook?.comments.map((comment: Comments) => (
            <BookComment key={comment.id} {...comment} />
          ))}
      </CommentsList>
      {user?.id ? (
        <TextAreaDiv>
          <CustomTextField
            id="outlined-multiline-static"
            label="Share a comment"
            multiline
            value={input}
            rows={4}
            onChange={handleTextInputChange}
          />
          <CustomButton onClick={handleCommentPost}>
            Post a comment
          </CustomButton>
        </TextAreaDiv>
      ) : (
        <Link to={"/sign-in"}>
          <CustomIcon src={signInBanner} alt="" />
        </Link>
      )}
      <Recomendations>Recommendations</Recomendations>
      <RecomendationsDiv>
        {books &&
          books?.map((bookItem: Book, index: number) => (
            <div key={bookItem.id}>
              {index < 4 && <BookCard key={bookItem.id} {...bookItem} />}
            </div>
          ))}
      </RecomendationsDiv>
    </Page>
  );
};

const CustomButtonDiv = styled.div`
  display: flex;
  justify-content: start;
  gap: 82px;
`;

const CommentsList = styled.div`
padding-bottom: 68px;
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
  width: 1280px;
  padding-bottom: 110px;
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
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomDescription = styled(Typography)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;
  padding-bottom: 10px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const Recomendations = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  padding-bottom: 50px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const Comment = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  padding-bottom: 50px;
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
  padding-bottom: 74px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomBookDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 110px;
  gap: 128px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const Page = styled.div`
  padding: 60px 80px 150px 80px;
  width: 1280px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;


const CustomRateText = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #B9BAC3;

`
const CustomRating = styled(Rating)`
  font-size: 2.5rem;
  color:#BFCC94;
  //border: 2px solid #BFCC94;
`
const CustomRate = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #B9BAC3;

`

const CustomInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const RatingValueDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
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

const CustomButton = styled(ButtonBase)`

  padding: 10px 50px;
  border-radius: 16px;
  background: #344966;
  color: #f0f4ef;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.75px;
  text-align: center;

  &.MuiButton-root:hover {
    background-color: #344966;
  }
  &.Mui-disabled {
    background: #b9bac3;
  }

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const RecomendationsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomButtonText = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #344966;
  padding-bottom: 14px;
`

const TextAreaDiv = styled.div`
  padding-bottom: 108px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 276px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomTextField = styled(TextField)`
  width: 738px;
  border-radius: 16px;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: left;
  border: none;
  color: #B9BAC3;

  background: #F0F4EF;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

export default BookPage;
