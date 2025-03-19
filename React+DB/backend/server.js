const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const app = express();
const port = 3000;

// Lisää CORS middleware
app.use(cors());
app.use(express.json());
// Käytetään JSON-middlewarea POST-datan käsittelyyn
app.use(express.static(path.join(__dirname, "public")));

// Yhdistä SQLite-tietokantaan käyttäen Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: true, // print sql commands
});

// Määritellään User-malli
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    admin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false, // Ei lisätä createdAt ja updatedAt -kenttiä
    tableName: "users", // Käytetään nimeä 'users' eikä oletusta 'Users'
  }
);

// Synkronoidaan malli tietokantaan
(async () => {
  try {
    await sequelize.sync();
    console.log("Tietokanta synkronoitu onnistuneesti");
  } catch (error) {
    console.error("Tietokannan synkronointi epäonnistui:", error);
  }
})();

// Lisää käyttäjä (Create)
app.post("/users", async (req, res) => {
  const { name, email, admin = false } = req.body; // Oletus: admin = false
  const isAdmin = admin ? 1 : 0; // Muunnetaan Boolean -> Integer

  if (!name || !email) {
    return res.status(400).json({ error: "Nimi ja sähköposti vaaditaan" });
  }

  try {
    const user = await User.create({
      name,
      email,
      admin: isAdmin,
    });
    res.status(201).json({ id: user.id, name, email, admin: isAdmin });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Hae kaikki käyttäjät (Read)
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Päivitä käyttäjä (Update)
app.put("/users/:id", async (req, res) => {
  const { name, email, admin } = req.body;
  const isAdmin = admin ? 1 : 0; // Muunnetaan Boolean -> Integer
  const { id } = req.params;

  if (!name || !email || admin === undefined) {
    return res
      .status(400)
      .json({ error: "Nimi, sähköposti ja admin-tieto vaaditaan" });
  }

  try {
    const [updated] = await User.update(
      { name, email, admin: isAdmin },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Käyttäjää ei löytynyt" });
    }

    // Haetaan päivitetty käyttäjä tietokannasta ja palautetaan se
    const updatedUser = await User.findByPk(id);
    res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Poista käyttäjä (Delete)
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: "Käyttäjää ei löytynyt" });
    }

    res.json({ message: "Käyttäjä poistettu", id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});
