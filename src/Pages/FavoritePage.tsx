import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import FormButton from "../Components/FormButton";
import logo from "../Logos/unsplash_DgQf1dUKUTM.svg";
import { useNavigate } from "react-router-dom";
import { bookRemovedFromFavorite, removeBookFromFavorite } from "../store/userSlice";
import { notify } from "../Notify";
import { FavoriteBooks } from "../interfaces/interfaces";

const FavoritePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteBooks, id } = useSelector(
    (state: RootState) => state.users!.user!.favorite
  );
    console.log(favoriteBooks);
    
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    navigate("/books");
  };

  const handleRemoveFromFavorite = async (bookId: string) => {
    try {
      const response = await dispatch(removeBookFromFavorite(bookId)).unwrap();
      dispatch(bookRemovedFromFavorite(bookId))
      notify(response.data.message, "succsess")
    } catch (error) {}
  };
  return (
    <div>
      {favoriteBooks!.length === 0 && (
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
        {favoriteBooks!.map((favoriteBook: FavoriteBooks) => (
          <div key={favoriteBook.id}>
            <CustomTitle>{favoriteBook.book.title}</CustomTitle>
            <CustomAuthor>{favoriteBook.book.author.author_name}</CustomAuthor>
            <Button
              onClick={() => handleRemoveFromFavorite(favoriteBook.book.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;

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
