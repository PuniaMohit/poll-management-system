import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/Login/login";
import Header from "./components/Header/header";
import Home from "./components/Home/home";
import SignUpPage from "./components/Signup/signUp";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* I left home here because logic of showing loginpage if not login or redirected to pollList page */}
        <Route exact path="/" element={<Home />} />  
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
