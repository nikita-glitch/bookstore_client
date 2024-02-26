import { Button, Rating, TextField, Typography } from "@mui/material";
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
    let value = 0;
    user?.rating?.forEach((rate) => {
      if (rate.userId === user!.id && rate.bookId === id) {
        value = rate.value;
      }
    });
    return value;
  };

  const handleTextInputChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(ev.target.value);
  };

  const handleCommentPost = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const response = await dispatch(
        postComment({
          commentText: input,
          bookId: id,
        })
      ).unwrap();
      notify(response.data.message, "succsess");
      setInput("");
    } catch (error) {}
  };

  const handleRatingChange = async (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (!newValue) {
      return;
    }

    try {
      const response = await dispatch(
        setBookRating({
          ratingValue: newValue,
          bookId: id,
        })
      ).unwrap();
      notify(response.data.message, "succsess");
    } catch (error) {}
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
            <CustomLogo src={logo} alt="" />
            <Typography>{rating ?? 0}</Typography>

            <Rating
              name="simple-controlled"
              disabled={user ? false : true}
              value={getUserRate()}
              onChange={handleRatingChange}
            />
            <Typography>Rate this book</Typography>
          </CustomRatingDiv>

          <CustomDescriptionDiv>
            Description
            <DescriptionText>{currentBook?.description}</DescriptionText>
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
        <Comment>Comments</Comment>
        {currentBook?.comments &&
          currentBook?.comments.map((comment: Comments) => (
            <BookComment key={comment.id} {...comment} />
          ))}
      </CommentsList>
      {user?.id ? (
        <TextAreaDiv>
          <TextField
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
          books!.map((bookItem: Book, index: number) => (
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
  justify-content: space-around;
`;

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

const Comment = styled(Typography)`
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
