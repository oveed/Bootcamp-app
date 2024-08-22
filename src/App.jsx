import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import AuthPage from './modules/login/components/login';
import Home from './modules/home/components/homePage';
import './App.css'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<AuthPage />} />
      </Routes>
    </div>
  );

}

export default App
