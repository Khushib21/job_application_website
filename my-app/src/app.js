import React, { useState } from "react";
import Home from "./pages/Home";
import Job from "./pages/Job";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/job" element={<Job />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};
export default App;
