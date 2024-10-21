import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBalance = () => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  const { id } = useParams();
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
      }
    };

    fetchAccountData();
  }, [id]);

  const handleAddBalance = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/account/${id}/balance`, 
        {
          wallet: +amount,
        },
        {
          withCredentials: true, 
        }
      );
      setSuccessMessage("Suma pridėta sėkmingai!");
      setTimeout(() => {
        navigate("/account-list");
      }, 2000);
    } catch (error) {
      console.error("Klaida pridedant suma:", error); 
    }
  };

  return (
    <div>
      <div>
        <h2>Padidinti suma: </h2>
        {account ? ( 
          <div>
            <p>
              <strong>Vardas:</strong> {account.firstName}{" "}
            </p>
            <p>
              <strong>Pavardė:</strong> {account.secondName}{" "}
            </p>
            <p>
              <strong>Dabartinė suma:</strong> {account.wallet} €{" "}
            </p>
          </div>
        ) : (
          <p>Nerasta saskaita.</p>
        )}
        <div className="action-buttons-container">
          <input
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="form-control"
            placeholder="Iveskite sumą"
          />
          <button
            className="button" 
            type="button"
            onClick={handleAddBalance} 
          >
            Pridėti suma
          </button>
        </div>
        {successMessage && (
          <p>{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AddBalance;