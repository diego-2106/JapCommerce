const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { 
    const filePath = path.join(__dirname, './front/login.html');
    res.sendFile(filePath);
   
});
app.post("/login", async (req, res) => {
    const { emailInput, passwordInput } = req.body;
  
    if (emailInput === "" || passwordInput === "") {
      return res.status(404).send("Los campos no pueden estar vacíos.");
    }else{ res.redirect('/index.html'); }
});
app.get('/index.html', (req, res) => { 
    res.sendFile(__dirname + '/front/index.html');
   
});
//1
app.get('/sell/publish.json', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'json', 'sell', 'publish.json'), 'utf8');
    res.json(JSON.parse(data));
});
//2
app.get('/cart/buy.json', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'json', 'cart', 'buy.json'), 'utf8');
    res.json(JSON.parse(data));
});
//3
app.get('/cats/cat.json', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'json', 'cats', 'cat.json'), 'utf8');
    res.json(JSON.parse(data));
});

app.get('/cats_products/:catID', (req, res) => {
    const data = fs.readFile('./json/cats_products/:catID', 'utf8');
    res.json(JSON.parse[req.params.catID]);
});

app.get('/products/:id', (req, res) => {
    const data = fs.readFile('./json/products/:id', 'utf8');
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
