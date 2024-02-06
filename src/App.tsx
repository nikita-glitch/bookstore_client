import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import SignUpPage from "./Pages/Auth/SignUpPage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/Auth/SignInPage";
import ProfilePage from "./Pages/ProfilePage";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App = () => {

  
  const user = useSelector((state: RootState) => state.users.user) 
  console.log(user);
  
  const ProtectedRoute = ({user, children}: {user: any, children?: JSX.Element}) => {
    if (Object.keys(user).length === 0 || user?.id === '') {
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
          <Route element={<ProtectedRoute user={user}/>}>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/cart" element={<ProfilePage/>}/>
            <Route path="/favorite" element={<ProfilePage/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
