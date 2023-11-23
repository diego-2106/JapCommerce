const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const path = require('path');

app.get('/login', (req, res) => { 
    const filePath = path.join(__dirname, 'login.html');
    res.sendFile(filePath);
   
});
//1
app.get('/sell/publish.json', (req, res) => {
    const data = fs.readFileSync('./json/sell/publish.json', 'utf8');
    res.json(JSON.parse(data));
});
//2
app.get('/cart/buy.json', (req, res) => {
    const data = fs.readFileSync('./json/cart/buy.json', 'utf8');
    res.json(JSON.parse(data));
});
//3
app.get('/cats/cat.json', (req, res) => {
    const data = fs.readFileSync('./json/cats/cat.json', 'utf8');
    res.json(JSON.parse(data));
});

app.get('/cats_products/...', (req, res) => {
    const data = fs.readFileSync('./data/cats_products/...', 'utf8');
    res.json(JSON.parse(data));
});

app.get('/products/...', (req, res) => {
    const data = fs.readFileSync('./data/products/...', 'utf8');
    res.json(JSON.parse(data));
});

// app.get('/sell/publish.json', (req, res) => {
//     const data = fs.readFileSync('./data/publish.json', 'utf8');
//     res.json(JSON.parse(data));
// });

// app.get('/sell/publish.json', (req, res) => {
//     const data = fs.readFileSync('./data/publish.json', 'utf8');
//     res.json(JSON.parse(data));
// });

// app.get('/sell/publish.json', (req, res) => {
//     const data = fs.readFileSync('./data/publish.json', 'utf8');
//     res.json(JSON.parse(data));
// });

  


app.listen(port, () => {

    console.log(`Corriendo en el servidor http://localhost:${port}`);
});
