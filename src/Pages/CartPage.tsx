import styled from "styled-components";
import logo from "../Logos/unsplash_DgQf1dUKUTM.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartBooks } from "../store/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartBooks } = useSelector(
    (state: RootState) => state.users.user.cart
  );
  

  return (
    <>
      {!cartBooks && <CustomLogo src={logo} alt="" />}
      {cartBooks.map((cartBook) => {
        <>
          <CustomTitle>{cartBook.book.title}</CustomTitle>
          <CustomAuthor>{cartBook.book.author.author_name}</CustomAuthor>
          <div>
            <>{cartBook.amount}</>
            <Button>delete</Button>
            <>{cartBook.book.price}</>
          </div>
        </>;
      })}
      {cartBooks.length !== 0 && (
        <>
          <Typography>Total</Typography>
          <></>
          <Button>Continue shopping</Button>
          <Button>Checkout</Button>
        </>
      )}
    </>
  );
};

export default CartPage;

const CustomLogo = styled.img``;
const CustomTitle = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
const CustomAuthor = styled(Typography)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
