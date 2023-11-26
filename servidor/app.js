const express = require("express");
const app = express();
const puerto = 3000;
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const claveSecreta = "claveUltraSecreta";


app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());


app.listen(puerto,() => {
    console.log(`Login pidiendolo en el puerto:http://localhost:${puerto}`);
});

app.get("/categories", (req, res) => {
    const fileName = "/servidor/jsons/cats/cat.json";
    res.sendFile(__dirname + fileName);
});

//obtiene los productos de cada categoria
app.get("/cats_products/:catID", (req, res)=>{
    res.sendFile(`${__dirname}/servidor/jsons/cats_products/${req.params.catID}.json`);
});

//obtiene la informacion de un producto especifico
app.get("/product-info/:selectedProductId", (req, res)=>{
    res.sendFile(`${__dirname}/servidor/jsons/products/${req.params.selectedProductId}.json`);
});


//obtiene los comentarios de un producto
app.get("/products_comments/:selectedProductId", (req, res)=>{
    res.sendFile(`${__dirname}/servidor/jsons/products_comments/${req.params.selectedProductId}.json`);
});


//Obtiene el producto para cargar al carrito
app.get("/cart", (req, res)=>{
    const fileName = "/servidor/jsons/user_cart/25801.json"
    res.sendFile(__dirname + fileName);
});

//metodo post que recibe los datos del body de postman, crea un archivo json ("user-purchase") y coloca dichos datos 
app.post("/cart", (req, res)=>{
    let data = JSON.stringify(req.body)
    fs.writeFile("user-Purchase.json", data, function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("El archivo se guardo con exito!");
    });
});


//LOGIN USUARIO

// Middleware para verificar y validar el token
const authorizeMiddleware = (req, res, next) => {
    // Obtén el token del encabezado de la solicitud
    const token = req.header('Authorization');
  
    // Verifica si el token está presente
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }
  
    try {
      // Verifica y decodifica el token
      const decoded = jwt.verify(token, claveSecreta); // Reemplaza 'claveSecreta' con tu clave secreta
  
      // Agrega la información del usuario decodificado al objeto de solicitud para su uso posterior
      req.user = decoded;
  
      // Continúa con la siguiente función en la cadena de middleware
      next();
    } catch (error) {
      // Maneja errores relacionados con el token (token inválido, expirado, etc.)
      return res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
    }
  };
  

app.use(express.json());

// Endpoint para autenticar al usuario y generar el token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar las credenciales del usuario (ejemplo simple)
  if (username === 'usuario' && password === '1234') {
    // Payload del token
    const payload = {
      username: username,
      // Puedes agregar más información al token si lo necesitas
    };

    // Generar el token JWT con una firma secreta (clave secreta)
    const token = jwt.sign(payload, claveSecreta, { expiresIn: '1h' }); // Puedes ajustar el tiempo de expiración

    // Enviar el token como respuesta al cliente
    res.json({token});
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Middleware de autorización para la ruta /cart
app.use('/cart', authorizeMiddleware);

// Ruta /cart
app.get('/cart', (req, res) => {
  // Solo llegará aquí si el middleware de autorización permite el acceso
  res.json({ message: 'Acceso permitido a /cart' });
});

