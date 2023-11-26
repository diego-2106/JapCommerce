const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const port = 3000;
const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');

// conexion
const db = mariadb.createPool({

    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'usuarios',
    connectionLimit: 5 
});

app.use(express.json())

app.get('/', (req, res) => { 
    const filePath = path.join(__dirname, './front/login.html');
    res.sendFile(filePath);

});
app.post("/login", async (req, res) => {
    //res.redirect(__dirname, './front/index.html'); 
    const { email, password } = req.body;
  
    if (email === "" || password === "") {
      return res.status(404).send("Los campos no pueden estar vacíos.");
    }
  
try {
    const connection = await db.getConnection();
    const result = await connection.query(
        "SELECT * FROM usuario WHERE email = ? AND password = ?",
        [email, password]
    );

    if (result.length === 0) {
        const filePath = path.join(__dirname, './front/index.html');
        res.sendFile(filePath);
    }else {
      res.status(401).send("Usuario o contraseña incorrectos");
    }
    
    connection.release();
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

