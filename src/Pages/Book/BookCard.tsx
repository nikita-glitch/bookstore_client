import { Button, CardActions, Typography } from "@mui/material";
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
        <CardActions>
          <CustomIcon src={favIco} alt="" />
        </CardActions>
        <CardContent>
          <BookImg src="" alt="" />
          <CustomTitle>{book.title}</CustomTitle>
          <CustomAuthor>{}</CustomAuthor>
          <Rating
            name="simple-controlled"
            value={book.rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </CardContent>
        <CardActions>
          <CustomButton fullWidth>{book.price}</CustomButton>
        </CardActions>
      </CustomCard>
    </>
  );
};

const CustomTitle = styled(Typography)`
  @media only screen and (min-width: 835px) {
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomAuthor = styled(Typography)`
  @media only screen and (min-width: 835px) {
    color: tomato;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomButton = styled(Button)`
  @media only screen and (min-width: 835px) {
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const BookImg = styled.img`
  @media only screen and (min-width: 835px) {
    width: 305px;
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
    z-index: 9999;
    position: relative;
    top: 100px;
    left: 30px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomCard = styled(Card)`
  @media only screen and (min-width: 835px) {
    width: 415px;
    height: 663px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
export default BookCard;
