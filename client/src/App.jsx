import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { authuser } = React.useContext(AuthContext);

  return (
    <div className="bg-[url('https://www.shutterstock.com/image-vector/social-media-sketch-vector-seamless-600nw-1660950727.jpg')] bg-cover bg-center h-screen">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authuser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authuser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={authuser ? <Profile /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
