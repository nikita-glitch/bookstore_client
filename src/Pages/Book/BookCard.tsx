import { Button, CardActions, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import favIco from "../../Logos/button_save.svg";
import { useState } from "react";

const BookCard = (book: {}) => {
  const [rating, setRating] = useState<number | null>(0)
  const handleRatingSet = (ev:  React.SyntheticEvent<Element, Event>) => {
    // setRating(ev.currentTarget.val)
  }
  return (
    <>
      <CustomCard>
        <CardActions>
          <CustomIcon src={favIco} alt="" />
        </CardActions>
        <CardContent>
          <BookImg src="" alt="" />
          <CustomTitle>TITLE</CustomTitle>
          <CustomAuthor>AUTHOR</CustomAuthor>
          <Rating
            name="simple-controlled"
            value={null}
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
          />
        </CardContent>
        <CardActions>
          <CustomButton fullWidth>PRICE</CustomButton>
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
    display: none;
    :hover {
      
      position: relative;
      top: 100px;
      left: 30px;
    }
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomCard = styled(Card)`
  @media only screen and (min-width: 835px) {
    width: 305px;
    height: 663px;
  }
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
export default BookCard;
