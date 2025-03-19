import { useState } from "react";
import axios from "axios";

const Hero = ({ users, setUsers, fetchUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateIsAdmin, setUpdateIsAdmin] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lisää käyttäjä
  const handleAddUser = async () => {
    if (name && email) {
      setLoading(true);
      setError(null);
      try {
        // Lähetetään käyttäjä backendiin
        await axios.post("http://localhost:3000/users", {
          name,
          email,
          admin: isAdmin,
        });

        // Haetaan päivitetty käyttäjälista palvelimelta
        await fetchUsers();

        // Tyhjennetään lomake
        setName("");
        setEmail("");
        setIsAdmin(false);
      } catch (err) {
        console.error("Virhe käyttäjän lisäämisessä:", err);
        setError(err.response?.data?.error || "Virhe käyttäjän lisäämisessä");
      } finally {
        setLoading(false);
      }
    }
  };

  // Poista käyttäjä
  const handleDeleteUser = async (id) => {
    if (window.confirm("Haluatko varmasti poistaa tämän käyttäjän?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);

        // Haetaan päivitetty käyttäjälista palvelimelta
        await fetchUsers();
      } catch (err) {
        console.error("Virhe käyttäjän poistamisessa:", err);
        setError(err.response?.data?.error || "Virhe käyttäjän poistamisessa");
      } finally {
        setLoading(false);
      }
    }
  };

  // Valitse käyttäjä päivitettäväksi
  const selectUserForUpdate = (user) => {
    setUpdateId(user.id);
    setUpdateName(user.name);
    setUpdateEmail(user.email);
    setUpdateIsAdmin(user.admin);
  };

  // Päivitä käyttäjä
  const handleUpdateUser = async () => {
    if (updateId && updateName && updateEmail) {
      setLoading(true);
      setError(null);
      try {
        // Lähetetään päivitys backendiin
        await axios.put(`http://localhost:3000/users/${updateId}`, {
          name: updateName,
          email: updateEmail,
          admin: updateIsAdmin,
        });

        // Haetaan päivitetty käyttäjälista palvelimelta
        await fetchUsers();

        // Tyhjennetään päivityslomake
        setUpdateId(null);
        setUpdateName("");
        setUpdateEmail("");
        setUpdateIsAdmin(false);
      } catch (err) {
        console.error("Virhe käyttäjän päivittämisessä:", err);
        setError(
          err.response?.data?.error || "Virhe käyttäjän päivittämisessä"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section id="etusivu" className="section hero">
      <div className="crud-test-container">
        <h2>Käyttäjähallinta</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="crud-operations">
          {/* Lisää uusi käyttäjä */}
          <div className="crud-form">
            <h3>Lisää uusi käyttäjä</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nimi"
              disabled={loading}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Sähköposti"
              disabled={loading}
            />
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                disabled={loading}
              />{" "}
              Admin?
            </label>
            <button onClick={handleAddUser} disabled={loading}>
              {loading ? "Lisätään..." : "Lisää käyttäjä"}
            </button>
          </div>
          {/* Käyttäjälista */}
          <div className="items-container">
            <h3>Käyttäjälista</h3>
            {users.length === 0 ? (
              <p>Ei käyttäjiä.</p>
            ) : (
              <ul>
                {users.map((user) => (
                  <li key={user.id} className="user-item">
                    <div>
                      <strong>{user.name}</strong> ({user.email})
                      {user.admin ? " - Admin" : ""}
                    </div>
                    <div className="user-actions">
                      <button
                        onClick={() => selectUserForUpdate(user)}
                        className="update-button"
                        disabled={loading}
                      >
                        Muokkaa
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="delete-button"
                        disabled={loading}
                      >
                        Poista
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Päivitä käyttäjä */}
          <div className="crud-form">
            <h3>Päivitä käyttäjä</h3>
            <input
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              placeholder="Päivitettävä nimi"
              disabled={loading || !updateId}
            />
            <input
              type="email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              placeholder="Päivitettävä sähköposti"
              disabled={loading || !updateId}
            />
            <label>
              <input
                type="checkbox"
                checked={updateIsAdmin}
                onChange={(e) => setUpdateIsAdmin(e.target.checked)}
                disabled={loading || !updateId}
              />{" "}
              Admin?
            </label>
            <button onClick={handleUpdateUser} disabled={loading || !updateId}>
              {loading ? "Päivitetään..." : "Päivitä käyttäjä"}
            </button>
            {updateId && (
              <button
                onClick={() => {
                  setUpdateId(null);
                  setUpdateName("");
                  setUpdateEmail("");
                  setUpdateIsAdmin(false);
                }}
                disabled={loading}
                className="cancel-button"
              >
                Peruuta
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
