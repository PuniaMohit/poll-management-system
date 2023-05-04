import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/login";
import SignUpPage from "./components/Signup/signUp";
import AdminPollList from "./components/adminPollList/adminPollList";

function App() {
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
