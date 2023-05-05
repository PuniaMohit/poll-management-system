import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from "react-redux";
import LoginPage from "./components/Login/login";
import SignUpPage from "./components/Signup/signUp";
import AdminPollList from "./components/adminPollList/adminPollList";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/adminPollList");
    }
  }, [navigate]);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/adminPollList" element={<AdminPollList />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
