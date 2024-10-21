import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import './AccountList.css';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/account/accounts", 
          {
            withCredentials: true, // Cookies
          }
        );

        const sortedAccounts = response.data.sort(
          (a, b) => a.secondName.localeCompare(b.secondName)
        );

        setAccounts(sortedAccounts);
      } catch (err) {
        setError("Nepavyko pasiekti sąskaitos informacijos");
      }
    };

    fetchAccounts();
  }, []);

  const deleteAccount = async (accountId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/account/${accountId}`, 
        { withCredentials: true } 
      );
      alert(response.data.message);

      setAccounts(accounts.filter((account) => account._id !== accountId));
    } catch (error) {
      alert(
        error.response?.data?.message || "Nepavyko ištrinti sąskaitos."
      );
    }
  };

  return (
    <div className="container">
      <h2>Sąskaitų sąrašas</h2>
      {error && <p>{error}</p>}{" "}
      {accounts.length === 0 ? ( 
        <p>Nėra sąskaitų</p> 
      ) : (
        <div>
          {accounts.map(
            (
              account
            ) => (
              // STYLE THIS
              <div key={account._id} className="account-card">  
                {" "}
                <p>
                  <strong>Vardas:</strong> {account.firstName}
                </p>
                <p>
                  <strong>Pavardė:</strong> {account.secondName}
                </p>
                <p>
                  <strong>IBAN:</strong> {account.iban}
                </p>
                <p>
                  <strong>Asmens kodas:</strong> {account.idNumber}
                </p>
                <p>
                  <strong>Suma:</strong> {account.wallet} €
                </p>
                <div className="action-buttons-container">
                  <button
                    className="button"
                    onClick={() => navigate(`/add-balance/${account._id}`)} 
                  >
                    Padidinti suma
                  </button>
                  <button
                    className="button"
                    onClick={() => navigate(`/deduct-balance/${account._id}`)} 
                  >
                    Sumažinti suma
                  </button>
                  <button
                    className="button"
                    onClick={() => deleteAccount(account._id)}
                    disabled={account.wallet !== 0}
                  >
                    Ištrinti sąskaita
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
      </div>
  );
};

export default AccountList;