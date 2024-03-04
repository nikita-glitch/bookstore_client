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
import signInBannerSmall from "../../Logos/sing in banner.png";
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
    notify(response.message, "succsess");
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
    notify(response.message, "succsess");
  };

  const countBookAmount = () => {
    if (window.innerWidth > 834 && window.innerWidth < 1279) {
      return 3;
    }
    if (window.innerWidth < 833) {
      return 2;
    }
    return 4;
  };

  return (
    <Page>
      <CustomBookDiv>
        <Bookimg
          src={"http://localhost:5000/" + currentBook?.photos?.photo!}
          alt=""
        />
        {/* <CustomInfoDiv> */}
        <div>
        <BookTitle>{currentBook?.title}</BookTitle>
        <BookAuthor>{currentBook?.author.author_name}</BookAuthor>
        <CustomRatingDiv>
          <RatingValueDiv>
            <CustomLogo src={logo} alt="" />
            <CustomRate>{rating ?? 0}</CustomRate>
          </RatingValueDiv>

          <CustomRating
            name="simple-controlled"
            disabled={user?.id ? false : true}
            value={getUserRate()}
            onChange={handleRatingChange}
          />
          <CustomRateText>Rate this book</CustomRateText>
        </CustomRatingDiv>
        </div>
        <CustomDescriptionDiv>
          <CustomDescription>Description</CustomDescription>
          <DescriptionText>{currentBook?.description}</DescriptionText>
        </CustomDescriptionDiv>
        <CustomButtonDiv>
          <CustomDiv>
            <CustomButtonText>Paperback</CustomButtonText>
            <CustomButton disabled>Not available</CustomButton>
          </CustomDiv>
          <CustomDiv>
            <CustomButtonText>Hardcover</CustomButtonText>
            <CustomButton onClick={handleCartAddClick}>
              ${currentBook?.price} USD
            </CustomButton>
          </CustomDiv>
        </CustomButtonDiv>
        {/* </CustomInfoDiv> */}
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
          <CustomPostButton onClick={handleCommentPost}>
            Post a comment
          </CustomPostButton>
        </TextAreaDiv>
      ) : (
        <Link to={"/sign-in"}>
          <CustomIcon
            src={window.innerWidth < 833 ? signInBannerSmall : signInBanner}
            alt=""
          />
        </Link>
      )}
      <Recomendations>Recommendations</Recomendations>
      <RecomendationsDiv>
        {books &&
          books?.map(
            (bookItem: Book, index: number) =>
              index < 4 && <BookCard key={bookItem.id} {...bookItem} />
          )}
      </RecomendationsDiv>
    </Page>
  );
};

const CustomDiv = styled.div`
  width: 100%;
  
  
`;

const CustomButtonDiv = styled.div`
  display: flex;
  justify-content: start;
  gap: 82px;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  margin-bottom: 121px;
  @media (min-width: 835px) and (max-width: 1279px) {
    gap: 20px;
    margin: 0;
    margin-top: 50px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    gap: 20px;
    margin: 0;
    grid-row: 5 / 6;
    grid-column: 1 / 3;
  }
`;

const CommentsList = styled.div`
  padding-bottom: 68px;
  width: 738px;
  
  @media (min-width: 835px) and (max-width: 1279px) {
    padding-bottom: 60px;
    padding-right: 137px;
    width: 667px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    padding-bottom: 20px;
  }
`;

const CustomLogo = styled.img`
  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 15px;
    height: 15px;
  }
`;

const CustomRatingDiv = styled.div`
  display: flex;
  align-items: center;
  
  width: 504px;
  justify-content: space-between;
  
  @media (min-width: 835px) and (max-width: 1279px) {
    width: 374px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 30px;
    gap: 15px 40px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    flex-direction: column;
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    align-items: start;
    margin-bottom: 47px;
  }
`;

const CustomIcon = styled.img`
  width: 1280px;
  padding-bottom: 110px;
  @media (min-width: 835px) and (max-width: 1279px) {
    width: 804px;
    height: 400px;
    padding-bottom: 90px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    padding-bottom: 60px;
  }
`;

const Bookimg = styled.img`
  width: 100%;
  height: 779px;
  border-radius: 16px;
  grid-row: 1 / 4;
  grid-column: 1 / 2;
  @media (min-width: 835px) and (max-width: 1279px) {
  
    height: 584px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    
    margin-bottom: 20px;
    height: 202px;
    grid-row: 1 / 4;
    grid-column: 1 / 2;
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
  grid-row: 1 / 2;
  @media (min-width: 835px) and (max-width: 1279px) {
    font-size: 32px;
    line-height: 48px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0.75px;
    text-align: left;
    width: 100%;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    margin-bottom: 14px;
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

  @media (min-width: 835px) and (max-width: 1279px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    padding-bottom: 22px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
  }
`;

const Recomendations = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  padding-bottom: 50px;
  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
    font-family: Poppins;
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    padding-bottom: 30px;
  }
`;

const Comment = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  padding-bottom: 50px;
  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
    display: none;
  }
`;

const BookAuthor = styled(Typography)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  margin-bottom: 30px;
  @media (min-width: 835px) and (max-width: 1279px) {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
     margin-bottom: 20px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    font-family: Poppins;
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 20px;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    width: 100%;
  }
`;
const CustomDescriptionDiv = styled.div`
  width: 640px;
  @media (min-width: 835px) and (max-width: 1279px) {
    width: 392px;
   
  }
  @media (min-width: 320px) and (max-width: 834px) {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    padding-bottom: 30px;
    width: 100%;
    grid-row: 4 / 5;
    grid-column: 1 / 3;
  }
`;

const CustomBookDiv = styled.div`
  display: grid;
  width: 100%;
  padding-bottom: 110px;
  column-gap: 128px;
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: 835px) and (max-width: 1279px) {

    column-gap: 21px ;
    padding-bottom: 98px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    gap: 0px;
    display: grid;
    width: 100%;
    padding-bottom: 50px;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }
`;

const Page = styled.div`
  padding: 60px 80px 150px 80px;
  width: 100%;
  @media (min-width: 835px) and (max-width: 1279px) {
   
    padding: 100px 15px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    padding: 33px 0 0 0;
    box-sizing: border-box;
  }
`;

const CustomRateText = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #b9bac3;
  @media (min-width: 835px) and (max-width: 1279px) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  @media (min-width: 320px) and (max-width: 834px) {
  }
`;
const CustomRating = styled(Rating)`
  font-size: 2.5rem;
  color: #bfcc94;
  //border: 2px solid #BFCC94;
  @media (min-width: 835px) and (max-width: 1279px) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    font-size: 1,5;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 135px;
    font-size: 1rem;
  }
`;
const CustomRate = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #b9bac3;
  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
    font-family: Poppins;
font-size: 13px;
font-weight: 500;
line-height: 20px;
letter-spacing: 0em;
text-align: left;

  }
`;

const CustomInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 833px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
    display: grid;
  }
`;

const RatingValueDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  @media only screen and (max-width: 320px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const DescriptionText = styled(Typography)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #344966;

  @media (min-width: 835px) and (max-width: 1279px) {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    width: 100%;
  }
`;

const CustomPostButton = styled(ButtonBase)`
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

  @media (min-width: 835px) and (max-width: 1279px) {
    font-family: Poppins;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0.75px;
    text-align: center;
    width: 276px;
    height: 50px;
    padding: 10px 22.5px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    padding: 10px 50px;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.75px;
    text-align: center;
    width: max-content;
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

  @media (min-width: 835px) and (max-width: 1279px) {
    font-family: Poppins;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0.75px;
    text-align: center;
    width: 188px;
    height: 50px;
    padding: 10px 22.5px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
    padding: 10px 31px;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.75px;
    text-align: center;
    padding: 10px 22.5px;
  }
`;
const RecomendationsDiv = styled.div`
  display: flex;
  gap: 21px;
  @media (min-width: 835px) and (max-width: 1279px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 21px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    padding-bottom: 30px;
    width: 100%;
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
  @media (min-width: 835px) and (max-width: 1279px) {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const TextAreaDiv = styled.div`
  padding-bottom: 108px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 276px;
  @media (min-width: 835px) and (max-width: 1279px) {
    width: 738px;
    padding-bottom: 88px;
  }
  @media (min-width: 320px) and (max-width: 834px) {
    padding-bottom: 60px;
    width: 100%;
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
  color: #b9bac3;

  background: #f0f4ef;

  @media (min-width: 835px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
  }
`;

export default BookPage;
