import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getFavoriteBooks } from "../store/favoriteSlice";



const FavoritePage = () => {
  const { favoriteBooks } = useSelector(
    (state: RootState) => state.users.user.favorite
  );
  
  return (  
    <>
    {favoriteBooks.map((book) => {
      
    })}
    </>
  );
}
 
export default FavoritePage;