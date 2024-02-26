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
import BookPage from "./Pages/Book/BookPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const App = () => {
  const [init, setInit] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser());
    }
    setInit(true);
  }, [dispatch]);

  const { user, isLoading } = useSelector((state: RootState) => state.users!);

  return (
    <div className="App">
      <CustomNavDiv>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
      </CustomNavDiv>
      <CustomMainDiv>
        <Routes>
          <Route path="/books" element={<CatalogPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/books/:id" element={<BookPage />} />
          {init && (
            <Route element={<ProtectedRoute user={user!} />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart/:id" element={<CartPage />} />
              <Route path="/favorite/:id" element={<FavoritePage />} />
            </Route>
          )}
          <Route path="/" element={<CatalogPage />} />
        </Routes>
      </CustomMainDiv>
      <CustomFooterDiv>
      <Footer />
      </CustomFooterDiv>
    </div>
  );
};

export default App;

const CustomNavDiv = styled.div`
  flex-shrink: 0;
`

const CustomMainDiv = styled.div`
  height: 100%;
  flex-grow: 1;
`

const CustomFooterDiv = styled.div`
  flex-shrink: 0;
`