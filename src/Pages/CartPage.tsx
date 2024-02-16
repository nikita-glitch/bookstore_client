import styled from "styled-components";
import logo from "../Logos/unsplash_DgQf1dUKUTM.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartBooks } from "../store/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import FormButton from "../Components/FormButton";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../API/userAPI";
import { changeAmount } from "../API/cartApi";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { cartBooks, is_ordered, has_paid } = useSelector(
    (state: RootState) => state.users.user.cart
  );

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    navigate('/books')
  }

  const handleChangeAmountDec = async(bookId: string) => {
    const response = await changeAmount(bookId, false)
    console.log("dec>", response);
  }
  const handleChangeAmountInc = async(bookId: string) => {
    const response = await changeAmount(bookId, true)
    console.log("inc>", response);
    
  }

  const handleRemoveFromCart = async(bookId: string) => {
    const response = await removeFromCart(bookId)
    console.log("remove>", response);
    
  }

  const countTotal = () => {
    let count = 0;
    cartBooks.map((cartBook) => {
      count += cartBook.book.price * cartBook.amount
    })
    return count
  }
  
  return (
    <>
      {cartBooks.length === 0 && (
        <Box component="form" onSubmit={handleSubmit}>
        <EmptyCartDiv>
          <CustomLogo src={logo} alt="" />
          <div>
          <EmptyTitle>
          Your cart is empty
          </EmptyTitle>
          <GoToCatalog>
          Add items to cart to make a purchase. <br></br>Go to the catalogue no.
          </GoToCatalog>
          <FormButton buttonText="Go to catalog"  buttonType="submit"/>
          </div>
        </EmptyCartDiv>
        </Box>
      )}
      {cartBooks.map((cartBook) => 
        <div key={cartBook.id}>
          <CustomTitle>{cartBook.book.title}</CustomTitle>
          <CustomAuthor>{cartBook.book.author.author_name}</CustomAuthor>
          <div>
            <Button onClick={() => handleChangeAmountDec(cartBook.bookId)}>-</Button>
            <>{cartBook.amount}</>
            <Button onClick={() => handleChangeAmountInc(cartBook.bookId)}>+</Button>
            <Button onClick={() => handleRemoveFromCart(cartBook.bookId)}>delete</Button>
            <>{cartBook.book.price}</>
          </div>
        </div>
      )}
      {cartBooks.length !== 0 && (
        <>
          <Typography>Total:{countTotal()}</Typography>
          <></>
          <Button>Continue shopping</Button>
          <Button>Checkout</Button>
        </>
      )}
    </>
  );
};

export default CartPage;




const EmptyTitle = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: 0em;
  text-align: left;
  color: #0D1821;
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
`

const CustomLogo = styled.img`
  width: 433px;
  height: auto
`;

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
