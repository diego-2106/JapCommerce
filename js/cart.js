let idusuario = 25801;
let API = `https://japceibal.github.io/emercado-api/user_cart/${idusuario}.json`;
let cartProd;

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  let cart = []; // Inicializa un array para almacenar los productos en el carrito
  let subtotal = 0;

  // Función para calcular el subtotal de un producto
  function CalcularSubtotal(cantidad, precio) {
    return cantidad * precio;
  }

  // Función para actualizar el carrito en el almacenamiento local
  function actualizarCarrito() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Función para actualizar la visualización del carrito
  function actualizarCarritoVisual() {
    cartContainer.innerHTML = ''; // Borra el contenido actual del carrito
    subtotal = 0;

    cart.forEach((producto, index) => {
      let cantidad = producto.count;
      let precio = producto.unitCost;
      let subtotalProducto = CalcularSubtotal(cantidad, precio);
      subtotal += subtotalProducto;

      cartContainer.innerHTML += `
        <div class="card d-flex flex-row align-items-center">
          <img src="${producto.image}" alt="imagenDeProducto" width="200px" />
          <div class="card-body">
            <h5 class="card-title">Producto: ${producto.name}</h5>
            <p class="card-text">
              Precio Unidad: ${producto.currency} ${producto.unitCost}
              <input type="number" class="input-cantidad form-control cantProd flex-grow" value="${cantidad}" min="1" data-product-index="${index}" />
            </p>
            Subtotal: <span id="subtotalProducto${index}">${producto.currency} ${subtotalProducto}</span>
          </div>
        </div>`;

      const cantidadInput = cartContainer.querySelector(`[data-product-index="${index}"]`);
      cantidadInput.addEventListener('input', (event) => {
        const cantidad = parseInt(event.target.value);
        cart[index].count = cantidad; // Actualiza la cantidad en el carrito
        actualizarCarrito(); // Actualiza el carrito en el almacenamiento local
        actualizarCarritoVisual(); // Actualiza la visualización del carrito
      });
    });

    const totalSpan = document.getElementById("cart-total");
    totalSpan.textContent = `Total: ${cart[0].currency} ${subtotal}`;
  }

  fetch(API)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error de solicitud");
    }
    return response.json();
  })
  .then((data) => {
    cartProd = data.articles;
    // Renderiza los productos
    cartProd.forEach((producto, index) => {
      const cartItem = `
        <div class="card d-flex flex-row align-items-center">
          <img src="${producto.image}" alt="imagenDeProducto" width="200px" />
          <div class="card-body">
            <h5 class="card-title">Producto: ${producto.name}</h5>
            <p class="card-text">
              Precio Unidad: ${producto.currency} ${producto.unitCost}
              <button class="add-to-cart-button" data-product-index="${index}">Añadir al carrito</button>
            </p>
          </div>
        </div>
      `;
      document.getElementById("product-list").innerHTML += cartItem;
    });
  });


  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    const existente = cart.findIndex((item) => item.id === producto.id);
    if (existente !== -1) {
      // Si el producto ya existe en el carrito, actualiza su cantidad
      cart[existente].count += 1;
    } else {
      // Si el producto no existe en el carrito, agrégalo
      cart.push({ ...producto, count: 1 });
    }

    actualizarCarrito(); // Actualiza el carrito en el almacenamiento local
    actualizarCarritoVisual(); // Actualiza la visualización del carrito
  }

  // Agrega un evento click para cada botón "Añadir al carrito"
  document.querySelectorAll(".add-to-cart-button").forEach((button, index) => {
    button.addEventListener('click', () => {
      agregarAlCarrito(cartProd[index]);
    });
  });

  // Carga el carrito desde el almacenamiento local
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  // Actualiza la visualización del carrito
  actualizarCarritoVisual();
});

