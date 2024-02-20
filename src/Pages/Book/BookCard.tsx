import { Box, Button, CardActions, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import favIco from "../../Logos/button_save.svg";
import favIcoClicked from "../../Logos/Group 229.svg";
import { FC, useState } from "react";
import { Book, FavoriteBooks } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addBookToFavorite, bookRemovedFromFavorite, removeBookFromFavorite } from "../../store/userSlice";
import { notify } from "../../Notify";

const BookCard: FC<Book> = (book: Book) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const favoriteBooks = useSelector((state: RootState) => state.users.user?.favorite?.favoriteBooks);
  
  const handleButtonClick = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigate("/books/" + book.id);
  };

  const handleAddToFavorite = async(ev: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    try {
      const isInFavorite = setLogo()
      if (isInFavorite) {
        const response = await dispatch(removeBookFromFavorite(book.id)).unwrap();
        dispatch(bookRemovedFromFavorite(book.id))
        notify(response.data.message, "succsess")
      } else {
      const response = await dispatch(addBookToFavorite(book.id)).unwrap()      
      notify(response.data.message, "succsess")
    }
    } catch (err: any) {
      console.log(err);
      notify(err.response.data, "error")
    }
  }
  
  const setLogo = () => {
    let isInFavorite = false
    
    favoriteBooks?.map((favBook) => {
      
      if (favBook.book.id === book.id) {
        isInFavorite = true
        return
      }
    })
    return isInFavorite 
  }
  
  return (
    <>
      <CustomCard>
        <CardMedia>
          
          <BookImg src={''} alt="" />
        </CardMedia>
        <CustomCardContent>
          <CustomIcon src={setLogo() ? favIcoClicked : favIco} alt="" onClick={handleAddToFavorite}/>
          <CustomTitle>{book.title}</CustomTitle>
          <CustomAuthor>{book.author.author_name}</CustomAuthor>
          <RatingDiv>
            <CustomRating
              id="rating"
              name="simple-controlled"
              value={book.bookRating | 0}
              size="large"
              disabled
            />
            <Box>{book.bookRating | 0}</Box>
          </RatingDiv>
        </CustomCardContent>
        <CardActions>
          <CustomButton onClick={handleButtonClick}>{book.price}</CustomButton>
        </CardActions>
      </CustomCard>
    </>
  );
};

const CustomRating = styled(Rating)`
  color: #bfcc94;
  .MuiRating-root {
    display: flex;
    justify-content: space-between;
  }

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const RatingDiv = styled.div`
  @media only screen and (min-width: 835px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #b9bac3;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    margin: 10px 0;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomCardContent = styled(CardContent)`
  padding: 0;
`;

const CustomTitle = styled(Typography)`
  @media only screen and (min-width: 835px) {
    color: #344966;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomAuthor = styled(Typography)`
  @media only screen and (min-width: 835px) {
    color: #b9bac3;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomButton = styled(Button)`
  @media only screen and (min-width: 835px) {
    background: #344966;
    border-radius: 16px;
    padding: 10px 180px;
    color: #f0f4ef;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: center;
    &:hover {
      background: #344966;
    }
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const BookImg = styled.img`
  @media only screen and (min-width: 835px) {
    width: 420px;
    height: 448px;
    border-radius: 16px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomIcon = styled.img`
  @media only screen and (min-width: 835px) {
    position: relative;
    bottom: 430px;
    left: 20px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomCard = styled(Card)`
  @media only screen and (min-width: 835px) {
    display: flex;
    flex-direction: column;
    box-shadow: none;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
export default BookCard;
