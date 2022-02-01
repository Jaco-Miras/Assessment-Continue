import React from "react";
import LogIn from "./components/LogIn";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { useUserAuth } from "./context/AuthContext";
import HomeAdmin from "./components/HomeAdmin";
import Home from "./components/Home";
import Menu from "./components/UserSide/Menu";
import TechStack from "./components/UserSide/TechStack";
import PlaceOrder from "./components/UserSide/PlaceOrder";
import ViewOrder from "./components/UserSide/ViewOrder";

function App() {
  const { user } = useUserAuth();
  return (
    <Routes>
      <Route
        path="/home"
        element={user?.role === "admin" ? <HomeAdmin /> : <Home />}
      />
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/techstack" element={<TechStack />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/vieworder" element={<ViewOrder />} />
    </Routes>
  );
}

export default App;
