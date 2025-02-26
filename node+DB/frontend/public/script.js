// API URL
const API_URL = "http://localhost:3000";

// DOM Elements
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const adminInput = document.getElementById("AdminInput");
const updateNameInput = document.getElementById("updateNameInput");
const updateEmailInput = document.getElementById("updateEmailInput");
const updateAdminInput = document.getElementById("updateIsAdminInput");
const updateId = document.getElementById("updateId");
const usersList = document.getElementById("usersList");
const createBtn = document.getElementById("createBtn");
const updateBtn = document.getElementById("updateBtn");

// Load users when page loads
document.addEventListener("DOMContentLoaded", loadUsers);

// Create user
createBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const isAdmin = adminInput.checked;

  if (!name || !email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert("Anna kelvollinen nimi ja sähköpostiosoite!");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, admin: isAdmin }),
    });

    if (!response.ok) throw new Error("Virhe käyttäjän luonnissa");

    nameInput.value = "";
    emailInput.value = "";
    adminInput.checked = false;
    await loadUsers();
  } catch (error) {
    alert("Virhe: " + error.message);
  }
});

// Load users
async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    usersList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${user.name} </br> (${user.email}) </br>
            <span style="color: ${user.admin ? "red" : "black"};">
                ${user.admin ? "Admin" : ""}
            </span>
        </span>
        <div>
            <button onclick="editUser(${user.id}, '${user.name}', '${
        user.email
      }', ${user.admin})">
                Muokkaa
            </button>
            <button onclick="deleteUser(${user.id})">
                Poista
            </button>
        </div>
      `;
      usersList.appendChild(li);
    });
  } catch (error) {
    alert("Virhe käyttäjien latauksessa: " + error.message);
  }
}

// Edit user (prepare update form)
function editUser(id, name, email, isAdmin) {
  updateId.value = id;
  updateNameInput.value = name;
  updateEmailInput.value = email;
  updateAdminInput.checked = isAdmin; // Tässä asetetaan admin-tieto muokkauslomakkeeseen
}

// Update user
updateBtn.addEventListener("click", async () => {
  const id = updateId.value;
  const name = updateNameInput.value.trim();
  const email = updateEmailInput.value.trim();
  const isAdmin = updateAdminInput.checked;

  if (!id || !name || !email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert("Anna kelvollinen nimi ja sähköpostiosoite!");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, admin: isAdmin }),
    });

    if (!response.ok) throw new Error("Virhe käyttäjän päivityksessä");

    updateId.value = "";
    updateNameInput.value = "";
    updateEmailInput.value = "";
    updateAdminInput.checked = false;
    await loadUsers();
  } catch (error) {
    alert("Virhe: " + error.message);
  }
});

// Delete user
async function deleteUser(id) {
  if (!confirm("Haluatko varmasti poistaa tämän käyttäjän?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Virhe käyttäjän poistossa");
    }

    await loadUsers();
  } catch (error) {
    alert("Virhe: " + error.message);
  }
}
