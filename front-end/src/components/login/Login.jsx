import React, { useState } from "react"; 
import axios from "axios"; 
import logo from '../../assets/CatBankLogo.png';

import './Login.css';

function Login({setUser}) {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/login`,
        {
          userName,
          password,
        },
        {
          withCredentials: true, 
        }
      );

      setUser({ id: response.data.id, userName: response.data.userName });
      setMessage("Prisijungimas pavyko!"); 
      setUserName(""); 
      setPassword(""); 

    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`); 
      } else {
        setMessage("Nepavyko prisijungti prie serverio: " + error + ` http://localhost:5000/api/user/login`);
      }
    }
  };

  return (
    <>
    <div>
        <div className="logo-container">
          <img className="logo-image" src={logo} alt="" />
        </div>
        <form  className="login-form" action="" onSubmit={handleSubmit}>
          {" "}
          Prisijungti:
          <input
            type="text" 
            className="form-control"
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            required 
            placeholder="Iveskite naudotojo varda" 
          />
          <input
            type="password" 
            className="form-control"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Iveskite slaptažodį"
          />
          
          <button type="submit">
            {" "}
            Prisijungti
          </button>
        </form>
        <br />
        {message && <div>{message}</div>}{" "}
      </div>
    </>
  )
}

export default Login
