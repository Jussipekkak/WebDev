const express = require("express");
const path = require("path");

const app = express();
const port = 3050;

// Määritä "public"-kansio staattiseksi tiedostokansioksi
app.use(express.static(path.join(__dirname, "public")));

// Palauta index.html pääsivuna
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Käynnistä palvelin
app.listen(port, () => {
  console.log(
    `Express-palvelin käynnissä osoitteessa http://localhost:${port}`
  );
});
