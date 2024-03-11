import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import FormButton from "../Components/FormButton";
import logo from "../Logos/unsplash_DgQf1dUKUTM.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getFavoriteBook } from "../store/userSlice";
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
    <FavoritePageDiv>
      {favoriteBooks?.length === 0 && (
        <Box component="form" onSubmit={handleSubmit}>
          <EmptyFavoriteDiv>
            <CustomLogo src={logo} alt="" />
            <CustomDiv>
              <EmptyTitle>Your favorite is empty</EmptyTitle>
              <GoToCatalog>Go to the catalogue no.</GoToCatalog>
              <FormButton buttonText="Go to catalog" buttonType="submit" />
            </CustomDiv>
          </EmptyFavoriteDiv>
        </Box>
      )}
      {favoriteBooks?.map((favoriteBook: FavoriteBooks) => (
        <>
          <FAVORITE_CART_BOOK {...favoriteBook} key={favoriteBook.id} />
          {lastElemCheck(favoriteBook) && (
            <LineDiv key={favoriteBook.bookId}></LineDiv>
          )}
        </>
      ))}
    </FavoritePageDiv>
  );
};

export default FavoritePage;

const CustomDiv = styled.div`
  width: 100%;
`;

const FavoritePageDiv = styled.div`
  width: 100%;
  padding: 20px 0 114px 118px;

  @media (min-width: 835px) and (max-width: 1279px) {
    padding: 20px 0 64px 0;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    padding: 35px 0 30px 0;
  }
`;

const LineDiv = styled.div`
  width: 100%;
  border: 1px solid #d6d8e7;
  box-sizing: border-box;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
  }
`;

const EmptyFavoriteDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 118px 0 158px 0;
  gap: 109px;
  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    padding: 0;
    flex-direction: column-reverse;
    padding-top: 15px;
    gap: 40px;
  }
`;

const CustomLogo = styled.img`
  width: 433px;
  height: auto;

  @media (min-width: 835px) and (max-width: 1279px) {
    height: 341px;
  }

  @media (min-width: 320px) and (max-width: 834px) {
    width: 100%;
  }
`;

const EmptyTitle = styled(Typography)`
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: 0em;
  text-align: left;
  color: #0d1821;
  margin-bottom: 20px;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 15px;
  }
`;

const GoToCatalog = styled(Typography)`
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #344966;
  margin-bottom: 60px;

  @media (min-width: 835px) and (max-width: 1279px) {
  }

  @media (min-width: 320px) and (max-width: 834px) {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 30px;
  }
`;
