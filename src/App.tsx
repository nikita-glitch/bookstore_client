import { useEffect, useState } from "react";
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
import CartPage from "./Pages/CartPage";
import FavoritePage from "./Pages/FavoritePage";
import BookPage from "./Pages/Book/BookPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { Skeleton } from "@mui/material";

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
      {isLoading ? (
        <Skeleton>
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
        </Skeleton>
      ) : (
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
      )}

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
  display: flex;
  padding-top: 24px;
  /* padding: 24px 80px; */
  padding-bottom: 0;
  max-width: 1280px;
  box-sizing: border-box;

  @media (min-width: 834px) and (max-width: 1279px) {
    padding: 24px 15px;
    padding-bottom: 0;
    width: 100%;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    padding: 20px 15px;
    padding-bottom: 0;
    width: 100%;
    display: block;
  }
`;

const CustomMainDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  max-width: 1280px;
  /* padding: 0 80px; */
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 834px) and (max-width: 1279px) {
    padding: 0 16px;
  }

  @media (min-width: 320px) and (max-width: 833px) {
    padding: 0 15px 70px 15px;
  }
`;

const CustomFooterDiv = styled.div`
  flex-shrink: 0;
  width: 100%;

  @media (min-width: 835px) and (max-width: 1279px) {
    height: auto;
  }

  @media (min-width: 320px) and (max-width: 834px) {
  }
`;
