import { Box, Button, CardActions, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import favIco from "../../Logos/button_save.svg";
import favIcoClicked from "../../Logos/Group 229.svg";
import { FC, useEffect, useState } from "react";
import { Book, FavoriteBooks } from "../../interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addBookToFavorite,
  getFavoriteBook,
  removeBookFromFavorite,
} from "../../store/userSlice";
import { notify } from "../../Notify";

const BookCard: FC<Book> = (book: Book) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    if (user?.favorite.id) {
      dispatch(getFavoriteBook(user.favorite.id));
    }
  }, [user?.favorite.id]);

  const favoriteBooks = useSelector(
    (state: RootState) => state.users.user?.favorite?.favoriteBooks
  );

  const handleAddToFavorite = async (
    ev: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (!user) {
      notify("Only authorized users can add book to favorite", "error");
      return;
    }

    const isInFavorite = checkIsInFavorite();

    if (isInFavorite) {
      const { response } = await dispatch(
        removeBookFromFavorite(book.id)
      ).unwrap();
      notify(response.data.message, "succsess");
      return;
    }

    const response = await dispatch(addBookToFavorite(book.id)).unwrap();
    notify(response.data.message, "succsess");
  };

  const checkIsInFavorite = () => {
    return favoriteBooks?.some((favBook) => favBook.book?.id === book.id);
  };

  return (
    <CustomCard>
      <CustomCardMedia>
        <BookImg src={"http://localhost:5000/" + book.photos?.photo} alt="" />
        <CustomIcon
          src={checkIsInFavorite() ? favIcoClicked : favIco}
          alt=""
          onClick={handleAddToFavorite}
        />
      </CustomCardMedia>
      <CustomCardContent>
        <CustomTitle>{book.title}</CustomTitle>
        <CustomAuthor>{book.author.author_name}</CustomAuthor>
        <RatingDiv>
          <CustomRating
          sx={{opacity: '1',}}
            id="rating"
            name="simple-controlled"
            value={book.bookRating | 0}
            disabled
          />
          <Box>{book.bookRating | 0}</Box>
        </RatingDiv>
      </CustomCardContent>
      <CardActions disableSpacing={true} sx={{ padding: 0, display: "block" }}>
        <Link to={"/books/" + book.id}>
          <CustomButton>${book.price} USD</CustomButton>
        </Link>
      </CardActions>
    </CustomCard>
  );
};

const CustomRating = styled(Rating)`
  color: #a5cc24;
  font-size: 2.5rem;
  &.Mui-disabled{
    opacity: 1;
  }
  &.MuiRating-root{
    display: "flex";
    justify-content: "space-between";
  }

  @media (min-width: 834px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 833px) {
    font-size: 20px;
  }
`;

const RatingDiv = styled.div`
  
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #b9bac3;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;

  @media (min-width: 834px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 833px) {
  }
`;

const CustomCardContent = styled(CardContent)`
  padding: 0;
  height: 107px;
  @media (min-width: 834px) and (max-width: 1279px) {
  }
  @media (min-width: 320px) and (max-width: 833px) {
    height: auto;
    padding-bottom: 15px;
  }
`;

const CustomCardMedia = styled(CardContent)`
  padding: 0;
  height: 448px;
  padding-bottom: 30px;
  @media (min-width: 834px) and (max-width: 1279px) {
    height: 372px;
  }
  @media (min-width: 320px) and (max-width: 833px) {
    height: 192px;
    padding-bottom: 15px;
  }
`;

const CustomTitle = styled(Typography)`
  color: #344966;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 834px) and (max-width: 1279px) {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

  }
  @media (min-width: 320px) and (max-width: 833px) {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;

 }
`;
const CustomAuthor = styled(Typography)`
  
    color: #b9bac3;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;

  @media (min-width: 834px) and (max-width: 1279px) {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
  @media (min-width: 320px) and (max-width: 833px) {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const CustomButton = styled(Button)`
  background: #344966;
  border-radius: 16px;
  padding: 10px 50px;
  color: #f0f4ef;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;
  width: 305px;
  &:hover {
    background: #344966;
  }
  @media (min-width: 834px) and (max-width: 1279px) {
    width: 254px;
  }
  @media (min-width: 320px) and (max-width: 833px) {
    width: 100%;
    padding: 3px 21.5px;
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: center;

  }
`;

const BookImg = styled.img`
  width: 305px;
  height: 448px;

  border-radius: 16px;
  @media (min-width: 834px) and (max-width: 1279px) {
    width: 254px;
    height: 372px;
  }
  @media (min-width: 320px) and (max-width: 833px) {
    width: 100%;
    height: 192px;
  }
`;

const CustomIcon = styled.img`
  position: relative;
  transform: translate(20px, -430px);

  @media (min-width: 834px) and (max-width: 1279px) {
   transform: translate(20px, -370px);
  }
  @media (min-width: 320px) and (max-width: 833px) {
    width: 25px;
    height: 25px;
    transform: translate(10px, -190px);
  }
`;
const CustomCard = styled(Card)`
  display: flex;
  flex-direction: column;
  box-shadow: none;
  width: 305px;
  @media (min-width: 834px) and (max-width: 1279px) {
    width: 254px;
  }
  @media (min-width: 320px) and (max-width: 833px) {
    width: 100%;
  }
`;
export default BookCard;
