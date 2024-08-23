import React from 'react';
import { Route, Routes } from "react-router-dom";
import AuthPage from './modules/login/components/login';
import Home from './modules/home/components/homePage';
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./modules/header/header";
import Footer from './modules/footer/footer';
import DoctorList from './modules/docList/docList';
import Contact from './modules/contact/contact';
import ChatBot from './modules/chatbot/ChatBot';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<AuthPage />} />
        <Route path="/docList" exact element={<PrivateRoute><DoctorList /></PrivateRoute>} />
        <Route path="/contact" exact element={<Contact />} />
      </Routes>
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;