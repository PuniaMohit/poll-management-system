import React, { useState } from "react";
import {  Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Header from './components/Header/header';
import Home from './components/Home/home'
import SignUpPage from "./components/Signup/signUp";

function App() {
 

  return (
    <div>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
      </div>
  );
}

export default App;
