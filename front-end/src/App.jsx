import React, { useState, useEffect } from "react"; 
import { Router, BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom"; 
// import Banner from "./components/Banner"; 
// import CreateClient from "./components/CreateClient"; 
//import Login from "./components/Login"; 
import axios from "axios"; 
// import ClientList from "./components/ClientList";
// import AddBalance from "./pages/addBalance/AddBalance"; 
// import DeductBalance from "./pages/deductBalance/DeductBalance"; 

import Header from './pages/header/Header.jsx';
import Login from './pages/login/Login';
import logo from './assets/CatBankLogo.png';
import './App.css';

function App() {

  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/check-user", {
        withCredentials: true, 
      })
      .then((resp) => {
        setUser(resp.data); 
      })
      .catch(() => {
        setUser(null); 
      });
  }, []);


  return (
    <BrowserRouter>
    {user && <Header user={user} setUser={setUser} />}{" "}
    {/* Conditionally render Banner if user is authenticated */}
    <Routes>
      {/* Define application routes */}
      <Route
        path="/create-client"
        element={user ? <CreateClient /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={
          user ? <Navigate to="/client-list" /> : <Login setUser={setUser} />
        } // Redirect to client-list if logged in
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/create-client" : "/login"} />} // Redirect to appropriate route based on user authentication
      />
      <Route
        path="/client-list"
        element={user ? <ClientList /> : <Navigate to="/login" />}
      />
      <Route
        path="/add-balance/:id"
        element={user ? <AddBalance /> : <Navigate to="/login" />}
      />
      <Route
        path="/deduct-balance/:id"
        element={user ? <DeductBalance /> : <Navigate to="/login" />}
      />
    </Routes>
  </BrowserRouter>
);
}
export default App;
