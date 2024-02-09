import { Box, Button, CardActions, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import favIco from "../../Logos/button_save.svg";
import { FC, useState } from "react";
import { Book } from "../../interfaces/interfaces";

const BookCard: FC<Book> = (book: Book) => {
  const [rating, setRating] = useState<number | null>(0);
  const handleRatingSet = (ev: React.SyntheticEvent<Element, Event>) => {
    // setRating(ev.currentTarget.val)
  };
  return (
    <>
      <CustomCard>
        <CardMedia>
          <BookImg src="" alt="" />
        </CardMedia>
        <CustomCardContent>
          <CustomIcon src={favIco} alt="" />
          <CustomTitle>{book.title}</CustomTitle>
          <CustomAuthor>{book.author.author_name}</CustomAuthor>
          <RatingDiv>
          <CustomRating
            id='rating'
            name="simple-controlled"
            value={book.rating | 0}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
            disabled
          />
          <Box >{book.rating | 0}</Box>
          </RatingDiv>
          
        </CustomCardContent>
        <CardActions>
          <CustomButton>{book.price}</CustomButton>
        </CardActions>
      </CustomCard>
    </>
  );
};

const CustomRating = styled(Rating)`
  @media only screen and (min-width: 835px) {
    color: #bfcc94;
    .MuiRating-root{
      display: flex;
      justify-content: space-between;
    }
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
    color: #B9BAC3;
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
    width: 420px;
    background: #344966;
    border-radius: 16px;
    padding: 10px 50px;
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
