const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

// Luo palvelin
const server = http.createServer((req, res) => {
    // Lataa tiedosto combined.html
    const filePath = path.join(__dirname, "combined.html");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Virhe ladattaessa sivua");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
});

// Käynnistä palvelin
server.listen(port, () => {
    console.log(`Palvelin käynnistyi osoitteessa http://localhost:${port}`);
});
