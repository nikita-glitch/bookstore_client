import { FC } from "react";
import { CartBooks, FavoriteBooks } from "../../interfaces/interfaces";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { removeBookFromCart, removeBookFromFavorite, setAmount } from "../../store/userSlice";
import deleteLogo from "../../Logos/Delete.svg";
import { notify } from "../../Notify";

const FAVORITE_CART_BOOK: FC<CartBooks> = (
  currentBook: CartBooks | FavoriteBooks
) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeAmountDec = async (bookId: string) => {
    try {
      await dispatch(
        setAmount({
          bookId: bookId,
          isIncrement: false,
        })
      ).unwrap();
    } catch (error) {}
  };
  const handleChangeAmountInc = async (bookId: string) => {
    try {
      await dispatch(
        setAmount({
          bookId: bookId,
          isIncrement: true,
        })
      ).unwrap();
    } catch (error) {}
  };

  const handleRemoveFromCart = async (bookId: string) => {
    try {
      const { response } = await dispatch(removeBookFromCart(bookId)).unwrap();
      notify(response.data.message, "succsess");
    } catch (error) {}
  };

  const handleRemoveFromFavorite = async (bookId: string) => {
    try {
      const { response } = await dispatch(removeBookFromFavorite(bookId)).unwrap();
      notify(response.data.message, "succsess");
    } catch (error) {}
  };
  return (
    
      <CartBookDiv>
        <CustomBookPhoto
          src={"http://localhost:5000/" + currentBook.book.photos?.photo}
          alt=""
        />
        <div>
          <Link to={"/books/" + currentBook.bookId}>
            <CustomTitle>{currentBook.book?.title}</CustomTitle>
          </Link>
          <CustomAuthor>{currentBook.book?.author.author_name}</CustomAuthor>
          {currentBook.amount ? (
            <>
              <div>
                <CustomAmount>
                  <ButtonContainer>
                  <AmountButton
                    onClick={() => handleChangeAmountDec(currentBook.bookId)}
                  >
                    -
                  </AmountButton>
                  <BookAmount>{currentBook.amount}</BookAmount>
                  <AmountButton
                    onClick={() => handleChangeAmountInc(currentBook.bookId)}
                  >
                    +
                  </AmountButton>
                  </ButtonContainer>
                  <CustomDeleteLogo
                    src={deleteLogo}
                    onClick={() => handleRemoveFromCart(currentBook.bookId)}
                  />
                </CustomAmount>
              </div>
              <CustomPrice>${currentBook.book?.price} USD</CustomPrice>{" "}
            </>
          ) : (
            <CustomDeleteLogo
              src={deleteLogo}
              onClick={() => handleRemoveFromFavorite(currentBook.bookId)}
            />
          )}
        </div>
      </CartBookDiv>
    
  );
};

export default FAVORITE_CART_BOOK;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 118px;
`

const BookAmount = styled.div`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.75px;
  text-align: center;
  color: #0d1821;
`;

const AmountButton = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 22px;
  min-width: 0;
  background: #f0f4ef;
  color: #000;
`;

const CustomBookPhoto = styled.img`
  width: 197px;
  height: 289px;
`;

const CustomAmount = styled.div`
  display: flex;
  width: 196px;
  align-items: center;
  gap: 58px;
  height: 33px;
  padding-top: 50px;
`;

const CartBookDiv = styled.div`
  display: flex;
  gap: 20px;
  padding: 40px 0;

`;

const CustomDeleteLogo = styled.img`
  width: 20px;
  height: 20px;
`;

const CustomTitle = styled(Typography)`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomPrice = styled(Typography)`
  font-family: Poppins;
  font-size: 36px;
  font-weight: 400;
  line-height: 54px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;
  padding-top: 50px;

  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;

const CustomAuthor = styled(Typography)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;
  @media only screen and (min-width: 321px) and (max-width: 834px) {
  }
  @media only screen and (max-width: 320px) {
  }
`;
