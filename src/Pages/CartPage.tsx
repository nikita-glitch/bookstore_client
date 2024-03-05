import styled from "styled-components";
import logo from "../Logos/unsplash_DgQf1dUKUTM.svg";
import { useDispatch } from "react-redux";
import { getCartBook } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import FormButton from "../Components/FormButton";
import { useNavigate, useParams } from "react-router-dom";
import { CartBooks } from "../interfaces/interfaces";
import { useEffect } from "react";
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
    if (!count) {
      return 0
    }
    return count.toFixed(2);
  };

  const lastElemCheck = (cartBook: CartBooks) => {
    return cartBooks.length - cartBooks.indexOf(cartBook) - 1 > 0;
  };

  return (
    <CartPageDiv>
      {!cartBooks?.length && (
        <Box component="form" onSubmit={handleSubmit}>
          <EmptyCartDiv>
            <CustomLogo src={logo} alt="" />
            <CustomDiv>
              <EmptyTitle>Your cart is empty</EmptyTitle>
              <GoToCatalog>
                Add items to cart to make a purchase. <br></br>Go to the
                catalogue no.
              </GoToCatalog>
              <FormButton buttonText="Go to catalog" buttonType="submit" />
            </CustomDiv>
          </EmptyCartDiv>
        </Box>
      )}
      
        {cartBooks?.map((cartBook: CartBooks) => (
          <>
            <FAVORITE_CART_BOOK key={cartBook.id} {...cartBook} />
            {lastElemCheck(cartBook) && <LineDiv key={cartBook.bookId}></LineDiv>}
          </>
        ))}
      {cartBooks?.length !== 0 && (
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
    </CartPageDiv>
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
  @media (min-width: 834px) and (max-width: 1279px){
    font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;

  }
  @media (min-width: 320px) and (max-width: 833px){
    font-family: Poppins;
    font-size: 12px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: center;
    width: 100%;
  }
`;

const CartPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0 114px 0;
  @media (min-width: 834px) and (max-width: 1279px){
    padding: 20px 0 104px 0;
    width: 100%;
  }
  @media (min-width: 320px) and (max-width: 833px){
    width: 100%;
    padding: 35px 0 30px 0;
  }

`

const CustomDiv = styled.div`
  width: 100%;

`

const ButtonsGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  @media (min-width: 834px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 833px){
    flex-direction: column;
  }
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
  @media (min-width: 834px) and (max-width: 1279px){
    font-family: Poppins;
font-size: 16px;
font-weight: 600;
line-height: 28px;
letter-spacing: 0.75px;
text-align: center;

  }
  @media (min-width: 320px) and (max-width: 833px){
    font-family: Poppins;
    font-size: 12px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.75px;
    text-align: center;
    width: 100%;
  }
`;


const LineDiv = styled.div`
  width: 100%;
  border: 1px solid #d6d8e7;
  box-sizing: border-box;
  @media (min-width: 834px) and (max-width: 1279px){
    width: 100%;
  }
  @media (min-width: 320px) and (max-width: 833px){
    width: 100%;
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

  @media (min-width: 834px) and (max-width: 1279px){
    font-family: Poppins;
font-size: 32px;
font-weight: 700;
line-height: 48px;
letter-spacing: 0em;
text-align: left;

  }
  @media (min-width: 320px) and (max-width: 833px){
    font-family: Poppins;
font-size: 18px;
font-weight: 700;
line-height: 27px;
letter-spacing: 0em;
text-align: left;
margin-bottom: 15px;
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

  @media (min-width: 834px) and (max-width: 1279px){
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 50px;


  }
  @media (min-width: 320px) and (max-width: 833px){
    font-family: Poppins;
font-size: 12px;
font-weight: 500;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
margin-bottom: 30px;
  }
`;

const EmptyCartDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 118px 0 158px 0;
  @media (min-width: 834px) and (max-width: 1279px){
    padding: 105px 15px 104px 15px;
    gap: 62px;
  }
  @media (min-width: 320px) and (max-width: 833px){
    padding: 0;
    flex-direction: column-reverse;
    padding-top: 15px;
    gap: 40px;
  }
`;

const TotalDiv = styled.div`
  padding-top: 10px;
  @media (min-width: 834px) and (max-width: 1279px){
    padding-top: 30px;
  }
  @media (min-width: 320px) and (max-width: 833px){
    padding-top: 40px;

  }
`;

const CustomLogo = styled.img`
  width: 433px;
  height: auto;
  @media (min-width: 834px) and (max-width: 1279px){
    width: 350px;
    height: 212px;
  }
  @media (min-width: 320px) and (max-width: 833px){
    width: 100%;
  }
`;

const StyledTotal = styled(Typography)`
  font-family: Poppins;
  font-size: 36px;
  font-weight: 400;
  line-height: 54px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;

  @media (min-width: 834px) and (max-width: 1279px){
    font-family: Poppins;
font-size: 36px;
font-weight: 700;
line-height: 54px;
letter-spacing: 0em;
text-align: left;


  }
  @media (min-width: 320px) and (max-width: 833px){
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

  @media (min-width: 834px) and (max-width: 1279px){

font-family: Poppins;
font-size: 36px;
font-weight: 400;
line-height: 54px;
letter-spacing: 0em;
text-align: left;
  }
  @media (min-width: 320px) and (max-width: 833px){
  }
`;

const CustomTotal = styled.div`
  display: flex;
  gap: 10px;
  @media (min-width: 834px) and (max-width: 1279px){
  }
  @media (min-width: 320px) and (max-width: 833px){
  }
`;
