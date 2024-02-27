import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import FormButton from "../Components/FormButton";
import logo from "../Logos/unsplash_DgQf1dUKUTM.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getFavoriteBook, removeBookFromFavorite } from "../store/userSlice";
import { notify } from "../Notify";
import { FavoriteBooks } from "../interfaces/interfaces";
import { useEffect } from "react";
import FAVORITE_CART_BOOK from "./Book/FAVORITE_CART_BOOK";

const FavoritePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getFavoriteBook(id));
    }
  }, [id, dispatch]);

  const { favoriteBooks } = useSelector(
    (state: RootState) => state.users!.user!.favorite
  );

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    navigate("/books");
  };

  const lastElemCheck = (favoriteBook: FavoriteBooks) => {
    return favoriteBooks.length - favoriteBooks.indexOf(favoriteBook) - 1 > 0;
  };

  return (
    <div>
      {favoriteBooks?.length === 0 && (
        <Box component="form" onSubmit={handleSubmit}>
          <EmptyCartDiv>
            <CustomLogo src={logo} alt="" />
            <div>
              <EmptyTitle>Your favorite is empty</EmptyTitle>
              <GoToCatalog>Go to the catalogue no.</GoToCatalog>
              <FormButton buttonText="Go to catalog" buttonType="submit" />
            </div>
          </EmptyCartDiv>
        </Box>
      )}
      <div>
        {favoriteBooks?.map((favoriteBook: FavoriteBooks) => (
          <div key={favoriteBook.id}>
            <FAVORITE_CART_BOOK {...favoriteBook} />
            {lastElemCheck(favoriteBook) && <LineDiv></LineDiv>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;

const LineDiv = styled.div`
  margin-left: 80px;
  width: 1280px;
  border: 1px solid #d6d8e7;
  box-sizing: border-box;
  & :last-child {
    border: none;
  }
`;

const EmptyCartDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 118px 185px 148px 188px;
`;

const CustomLogo = styled.img`
  width: 433px;
  height: auto;
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
