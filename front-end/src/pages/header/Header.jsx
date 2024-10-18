import React from "react"; // Importing React library
import { Link } from "react-router-dom"; // Importing Link for navigation between routes
import axios from "axios"; // Importing Axios for making HTTP requests
import './Header.css';

const Header = ({ user, setUser }) => {

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/logout", 
        null,
        {
          withCredentials: true,
        }
      );
      alert(response.data.message); 
      setUser(null); 
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again."); 
    }
  };

  return (
    <div className="">
      <Link to="/create-client" className="btn btn-light">
        Create Client
      </Link>
      <br />
      <Link to="/client-list" className="btn btn-light">
        Client List
      </Link>
      <br />
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Header;