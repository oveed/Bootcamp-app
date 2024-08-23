import { React, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import AuthPage from './modules/login/components/login';
import Home from './modules/home/components/homePage';
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./modules/header/header";
import Footer from './modules/footer/footer';
import './App.css';
import DoctorList from './modules/docList/docList';
import UserProfile from './modules/profile/components/userProfile';
import DoctorProfile from './modules/profile/components/docProfile';
import DoctorSignup from './modules/SignUp/docSignUp';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<AuthPage />} />
        <Route path="/docList" exact element={<DoctorList />} />
        <Route path="/myprofile" exact element={<DoctorProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
