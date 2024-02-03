import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import SignUpPage from "./Pages/Auth/SignUpPage";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/Auth/SignInPage";
import ProfilePage from "./Pages/ProfilePage";

const App = () => {
  const ProtectedRoute = ({user, children}: {user:any, children?: JSX.Element}) => {
    if (!user) {
      return <Navigate to='/' replace/>
    }
    return children ? children : <Outlet/>
  }
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<ProtectedRoute user={'user'}/>}>
          <Route path="/profile" element={<ProfilePage/>}/>
      </Route>

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
