import React, { useState } from "react"; // Importing React and useState hook
import axios from "axios"; // Importing Axios for HTTP requests
import { BASE_URL } from "../../utils/config.js"; // Importing base URL for API requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation after login

import './Login.css';


function Login({setUser}) {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <>
    <div>
        <form  className="login-form" action="">
          <input type="text" name="" id="" placeholder='Email...'/>
          <input type="password" name="" id="" placeholder='Password...'/>
          <button>LOGIN</button>
        </form>
      </div>
    </>
  )
}

export default Login
