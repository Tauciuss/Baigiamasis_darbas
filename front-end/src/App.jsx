import React, { useState, useEffect } from "react"; 
import { Router, BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";  
import CreateAccount from "./components/create-account/CreateAccount.jsx";  
import axios from "axios"; 
import AccountList from "./components/account-list/AccountList.jsx";
import AddBalance from "./components/add-balance/AddBalance"; 
import DeductBalance from "./components/deduct-balance/DeductBalance"; 

import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
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
    <Routes>
      <Route
        path="/create-account"
        element={user ? <CreateAccount /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={
          user ? <Navigate to="/account-list" /> : <Login setUser={setUser} />
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/create-account" : "/login"} />} // Redirect to appropriate route based on user authentication
      />
      <Route
        path="/account-list"
        element={user ? <AccountList /> : <Navigate to="/login" />}
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
