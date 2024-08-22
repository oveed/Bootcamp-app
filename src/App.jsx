import { React, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import AuthPage from './modules/login/components/login';
import Home from './modules/home/components/homePage';
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from './modules/profile/components/Profile';
import Calendar from './modules/reservation/components/calendar';
import Header from "./modules/header/header";
import Footer from './modules/footer/footer';
import './App.css';
import DoctorList from './modules/docList/docList';
import CalendarPage from './modules/profile/doctor/pages/DocProfilePage';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<AuthPage />} />
        <Route path="/profile" exact element={<PrivateRoute>
          <ProfilePage />
        </PrivateRoute>} />
        <Route path="/calendar" exact element={<PrivateRoute>
          <CalendarPage />
        </PrivateRoute>} />
        <Route path="/docList" exact element={<PrivateRoute><DoctorList /></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
