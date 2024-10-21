import React from "react"; // Importing React library
import { Link } from "react-router-dom"; // Importing Link for navigation between routes
import axios from "axios"; // Importing Axios for making HTTP requests
import './Header.css';

const Header = ({ user, setUser }) => {
  
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/logout", 
        null,
        {
          withCredentials: true,
        }
      );
      alert(response.data.message); 
      setUser(null); 
    } catch (error) {
      console.error("Atsijungimo klaida:", error);
      alert("Atsijungti nepavyko. Pabandykite dar kartą."); 
    }
  };

  return (
    <div className="buttons-container">
      <div className="action-buttons-container">
        <Link to="/create-account" className="button">
          Sukurti sąskaita
        </Link>
        <br />
        <Link to="/account-list" className="button">
          Sąskaitų sąrašas
        </Link>
        <br />
      </div>
      <button onClick={handleLogout} className="button">
        Atsijungti
      </button>
    </div>
  );
};

export default Header;