import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { isExpired, decodeToken } from "react-jwt";

const Router = () => {
  // const authToken = localStorage.getItem("token");

  // useEffect(() => {
  //   if (authToken) {
  //     console.log("token exists");
  //     console.log(authToken);
  //     const date = new Date(decodeToken(authToken)?.exp * 1000);
  //     console.log(date);
  //     console.log(decodeToken(authToken)?.exp * 1000 > Date.now());
  //     console.log(decodeToken(authToken)?.exp * 1000);
  //     console.log(Date.now());
  //     console.log(new Date(Date.now()));
  //   } else {
  //     console.log("token does not exist");
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to={"/home"} />} />
    </Routes>
  );
};

export default Router;
