import { React, useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import AuthPage from './modules/login/components/login';
import Home from './modules/home/components/homePage';
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from './modules/profile/doctor/components/Profile';
import Calendar from './modules/reservation/components/calendar';
import Header from "./modules/header/header";
import Footer from './modules/footer/footer';
import DoctorList from './modules/docList/docList';
import Contact from './modules/contact/contact';
import ChatBot from './modules/chatbot/ChatBot';

import UserProfile from './modules/profile/patient/components/userProfile';
import DoctorProfile from './modules/profile/doctor/components/docProfile';
import DoctorSignup from './modules/SignUp/docSignUp';
import CalendarPage from './modules/profile/doctor/pages/DocProfilePage';
import { setDoctorId, setIsDoctor } from './core/UserStore';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './utils/firebaseConfig';
import ReservationPage from './modules/reservation/pages/ReservationPage';
import DocProfilePage from './modules/profile/doctor/pages/DocProfilePage';
function App() {
  const { isDoctor } = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setIsDoctor());
        console.log(isDoctor)
      } else {
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<AuthPage />} />
        <Route path="/contact" exact element={<Contact />} />
        {/* <Route path="/profile" exact element={<PrivateRoute>
          <ProfilePage />
        </PrivateRoute>} /> */}
        <Route path="/calendar" exact element={<PrivateRoute>
          <CalendarPage />
        </PrivateRoute>} />
        <Route path="/docList" exact element={<PrivateRoute><DoctorList /></PrivateRoute>} />
        <Route path="/profile/:id" exact element={<PrivateRoute><DocProfilePage /></PrivateRoute>} />
        <Route path="/reservation/:id" exact element={<PrivateRoute><ReservationPage /></PrivateRoute>} />
      </Routes>
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;