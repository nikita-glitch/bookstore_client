import styled from "styled-components";
import logo from "../Logos/unsplash_DgQf1dUKUTM.svg";
import { useDispatch } from "react-redux";
import { getCartBook } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import FormButton from "../Components/FormButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { removeBookFromCart, setAmount } from "../store/userSlice";
import { changeAmount } from "../API/cartApi";
import { CartBooks } from "../interfaces/interfaces";
import { useEffect } from "react";
import { notify } from "../Notify";
import FAVORITE_CART_BOOK from "./Book/FAVORITE_CART_BOOK";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getCartBook(id));
    }
  }, [id]);

  const { cartBooks, has_paid, is_ordered } = useSelector(
    (state: RootState) => state.users.user?.cart!
  );

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    navigate("/books");
  };

  const countTotal = () => {
    const count = cartBooks?.reduce(
      (accum, cartBook) => (accum += cartBook.book.price * cartBook.amount),
      0
    );
    return count.toFixed(2);
  };

  return (
    <>
      {!cartBooks?.length && (
        <Box component="form" onSubmit={handleSubmit}>
          <EmptyCartDiv>
            <CustomLogo src={logo} alt="" />
            <div>
              <EmptyTitle>Your cart is empty</EmptyTitle>
              <GoToCatalog>
                Add items to cart to make a purchase. <br></br>Go to the
                catalogue no.
              </GoToCatalog>
              <FormButton buttonText="Go to catalog" buttonType="submit" />
            </div>
          </EmptyCartDiv>
        </Box>
      )}
      {cartBooks &&
        cartBooks?.map((cartBook: CartBooks) => (
          <>
            <FAVORITE_CART_BOOK key={cartBook.id} {...cartBook} />
            <LineDiv></LineDiv>
          </>
        ))}
      {cartBooks?.length && (
        <TotalDiv>
          <CustomTotal>
            <StyledTotal>Total:</StyledTotal>
            <StyledSum>{countTotal()}</StyledSum>
          </CustomTotal>
          <ButtonsGroup>
          <ShoppingButton>Continue shopping</ShoppingButton>
          <CheckoutButton>Checkout</CheckoutButton>
          </ButtonsGroup>
        </TotalDiv>
      )}
    </>
  );
};

export default CartPage;

const CheckoutButton = styled(Button)`
  width: 174px;
  height: 44px;
  padding: 10px, 50px, 10px, 50px;
  border-radius: 16px;
  background: #344966;
  gap: 10px;
  color: #f0f4ef;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: center;
  &:hover {
    background: #344966;
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: 20px;
`

const ShoppingButton = styled(Button)`
  width: 268px;
  height: 48px;
  padding: 10px, 50px, 10px, 50px;
  border-radius: 16px;
  border: 1px solid #0D1821;
  gap: 10px;
  color: #0D1821;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;

`;


const LineDiv = styled.div`
  margin-left: 80px;
  width: 1280px;
  border: 1px solid #d6d8e7;
  box-sizing: border-box;
  & :last-child {
    border: none;
  }
`;

const EmptyTitle = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;
  margin-bottom: 20px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const GoToCatalog = styled(Typography)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #344966;
  margin-bottom: 60px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const EmptyCartDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 118px 185px 148px 188px;
`;

const TotalDiv = styled.div`
  padding-left: 80px;
`;

const CustomLogo = styled.img`
  width: 433px;
  height: auto;
`;

const StyledTotal = styled(Typography)`
  font-family: Poppins;
  font-size: 36px;
  font-weight: 400;
  line-height: 54px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const StyledSum = styled(Typography)`
  font-family: Poppins;
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomTotal = styled.div`
  display: flex;
  gap: 10px;
`;
