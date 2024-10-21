import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios"; 

const DeductBalance = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState(""); 
  const [account, setAccount] = useState(null); 
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/account/${id}`, 
          {
            withCredentials: true,
          }
        );
        setAccount(response.data);
      } catch (error) {
        console.error(
          "Klaida gaunant sąskaitos informacija:",
          error.response?.data || error.message 
        );
        setError("Klaida gaunant sąskaitos informacija. Pabandykite dar kartą.");
      }
    };

    fetchAccountData();
  }, [id]);

  
  const handleDeductBalance = async () => {
    try {
      if (+amount > account.wallet) {
        setError("Netinkama suma. POabandykite dar karta.");
        return;
      }
      await axios.put(
        `http://localhost:5000/api/account/${id}/balance`,
        {
          wallet: -amount,
        },
        {
          withCredentials: true,
        }
      );
      setSuccessMessage("Sąskaitos suma sumažinta sėkmingai!");
      setTimeout(() => {
        navigate("/account-list");
      }, 2000);
    } catch (error) {
      console.error("Klaida sumažinant sumą:", error);
      setError("Iveskite tinkamą suma norint sumažinti dabartinę suma.");
    }
  };

  return (
    <div>
      <div>
        <h2>Sumažinti suma: </h2>
        {error && <p>{error}</p>}{" "}
        {account ? (
          <div>
            <p>
              <strong>Vardas:</strong> {account.firstName}{" "}
            </p>
            <p>
              <strong>Pavadė:</strong> {account.secondName}{" "}
            </p>
            <p>
              <strong>Dabartinė suma:</strong> {account.wallet} €{" "}
            </p>
          </div>
        ) : (
          <p>Nerasta sąskaitos informacija.</p>
        )}
        <div className="action-buttons-container">
          <input
            type="number"
            placeholder="Iveskite suma"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
          />
          <button
            className="button"
            type="button"
            onClick={handleDeductBalance}
          >
            Sumažinti suma
          </button>
        </div>
        {successMessage && (
          <p>{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default DeductBalance;