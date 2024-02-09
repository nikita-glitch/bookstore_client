import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import SignUpPage from "./Pages/Auth/SignUpPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/Auth/SignInPage";
import ProfilePage from "./Pages/ProfilePage";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { getUser } from "./store/userSlice";
import CatalogPage from "./Pages/CatalogPage";
import ProtectedRoute from "./ProtectedRoute";
import { Skeleton } from "@mui/material";
import CartPage from "./Pages/CartPage";
import FavoritePage from "./Pages/FavoritePage";

const App = () => {
  const [init, setInit] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      const token = localStorage.getItem("token");
      if (token ) {
        dispatch(getUser());
      }
      setInit(true)
    }
    return () => {
      ignore = true;
    };
  }, [dispatch]);

  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );

  return (
    <div className="App">
      {/* {isLoading ? (
        <Skeleton>
          <NavBar />
          <Footer />
        </Skeleton>
      ) : ( */}
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            {init && (
              
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorite" element={<FavoritePage />} />
              </Route>
            )}
            {/* <Route path="*" element={<CatalogPage />} /> */}
          </Routes>
          <Footer />
        </>
      {/* )} */}
    </div>
  );
};

export default App;
