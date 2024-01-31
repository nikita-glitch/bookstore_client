import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import SignUpPage from './Pages/Auth/SignUpPage';


const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <SignUpPage/>
      <Footer/>
    </div>
  );
}

export default App;
