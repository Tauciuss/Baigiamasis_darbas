import React, { useState } from "react";
import axios from "axios"; 
import { BASE_URL } from "../../utils/config.js";
import "./CreateAccount.css";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState(""); 
  const [secondName, setSecondName] = useState("");
  const [iban, setIban] = useState(""); 
  const [idNumber, setIdNumber] = useState("");
  const [idPhoto, setIdPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setIdPhoto(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); 
    formData.append("firstName", firstName); 
    formData.append("secondName", secondName); 
    formData.append("iban", iban);
    formData.append("idNumber", idNumber);
    formData.append("idPhoto", idPhoto);

    try {
      const response = await axios.post(
        BASE_URL + "/api/account/create-account/", 
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setMessage("Sąskaita sukurta!");
        setFirstName("");
        setSecondName("");
        setIban(generateLithuanianIBAN()); // Generate a new IBAN
        setIdNumber("");
        setIdPhoto(null);
      } else {
        setMessage(`Klaida: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(
        `Nepavyko susisiekti su serveriu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const generateLithuanianIBAN = () => {
    const countryCode = "LT"; // Lithuanian country code

    // Generate a random 4-digit bank code
    const bankCode = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits

    // Generate a random 16-digit account number
    const accountNumber = Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    ).toString(); // 16 digits

    const initialIBAN = `${countryCode}00${bankCode}${accountNumber}`;
    const checkDigits = calculateCheckDigits(initialIBAN);
    return `${countryCode}${checkDigits}${bankCode}${accountNumber}`;
  };

  const calculateCheckDigits = (iban) => {
    const rearrangedIBAN = iban.slice(4) + iban.slice(0, 4);

    const numericIBAN = rearrangedIBAN
      .split("")
      .map((char) =>
        isNaN(char) ? (char.charCodeAt(0) - 55).toString() : char
      ) 
      .join(""); 

    const mod97 = BigInt(numericIBAN) % BigInt(97);

    const checkDigits = (98n - mod97) % 100n;
    return checkDigits.toString().padStart(2, "0");
  };

  React.useEffect(() => {
    setIban(generateLithuanianIBAN());
  }, []); 

  return (
    <div className="action-buttons-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="main-form">
        <div className="form-group">
          <label>Vardas</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            minLength="3" 
            maxLength="20" 
            placeholder="Iveskite varda"
          />
        </div>

        <div className="form-group">
          <label>Pavardė</label>
          <input
            type="text"
            className="form-control"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)} 
            required
            minLength="3" 
            maxLength="20" 
            placeholder="Iveskite pavardę"
          />
        </div>

        <div className="form-group">
          <label>IBAN</label>
          <input
            type="text"
            className="form-control"
            value={iban} 
            readOnly 
          />
        </div>

        <div className="form-group">
          <label>Asmens kodas</label>
          <input
            type="text"
            className="form-control"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            minLength="11" 
            maxLength="11" 
            placeholder="Iveskite ID"
          />
        </div>

        <div className="form-group">
          <label>Nuotraukos ID </label>
          <input
            type="file"
            className="form-control-file"
            accept="image/*"
            onChange={handleFileChange} 
            required
          />
        </div>

        <button type="submit" className="button">
          Pateikti
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default CreateAccount;