import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/Login/login";
import Header from "./components/Header/header";
import SignUpPage from "./components/Signup/signUp";
import AdminPollList from "./components/adminPollList/adminPollList";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/adminPollList" element={<AdminPollList />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
