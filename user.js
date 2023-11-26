const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const port = 3000;

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));

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

app.get('/index.html', (req, res) => { 
    const filePath = path.join(__dirname, 'front', 'index.html');
    res.sendFile(filePath);
});

