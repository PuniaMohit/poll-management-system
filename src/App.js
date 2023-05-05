import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/Login/login";
import SignUpPage from "./components/Signup/signUp";
import PollList from "./components/PollList/pollList";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/adminPollList" element={<PollList />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
