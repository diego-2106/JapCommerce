const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const port = 3000;

app.use(express.json());
app.use(express.text());
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
//4
app.get('/cats_products/:catID', (req, res) => {
    const catID = req.params.catID;
    const filePath = path.join(__dirname, 'json', 'cats_products', `${catID}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Manejar el error, por ejemplo, devolver un código de estado 404
            res.status(404).send('Archivo no encontrado');
        } else {
            // Parsear el contenido del archivo JSON y devolverlo como respuesta
            res.json(JSON.parse(data));
        }
    });
});
//5
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const filePath = path.join(__dirname, 'json', 'products', `${productId}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Manejar el error, por ejemplo, devolver un código de estado 404
            res.status(404).send('Archivo no encontrado');
        } else {
            // Parsear el contenido del archivo JSON y devolverlo como respuesta
            res.json(JSON.parse(data));
        }
    });
});
app.get('/user_cart/25801.js', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'json', 'user_carts', '25801.json'), 'utf8');
    res.json(JSON.parse(data));
});



app.listen(port, () => {

    console.log(`Corriendo en el servidor http://localhost:${port}`);
});
