import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funktio käyttäjien hakemiseen
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error("Virhe haettaessa käyttäjiä:", err);
      setError("Käyttäjien hakeminen epäonnistui");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Haetaan käyttäjät kun komponentti ladataan
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      {loading && <div className="loading-indicator">Ladataan...</div>}
      {error && !loading && (
        <div className="error-message">
          {error}
          <button onClick={() => fetchUsers()}>Yritä uudelleen</button>
        </div>
      )}
      {!loading && !error && (
        <Hero users={users} setUsers={setUsers} fetchUsers={fetchUsers} />
      )}
    </div>
  );
}

export default App;
