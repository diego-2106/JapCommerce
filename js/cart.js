document.addEventListener('DOMContentLoaded', () => {
  // Recupera el carrito del almacenamiento local
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoContainer = document.getElementById("cart-items"); // El ID del contenedor en tu HTML

  let subtotal = 0;

  // Función para mostrar un producto en el carrito
  async function mostrarProductoEnCarrito(productId, quantity) {
    try {
      let response = await fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`);
      if (!response.ok) {
        throw new Error("Error de solicitud");
      }
      let productDetails = await response.json();

      // Calcula el subtotal del producto
      let subtotalProducto = productDetails.cost * quantity;

      // Crea un elemento HTML para mostrar el producto en el carrito
      let productoHTML = `
        <div class="card d-flex flex-row align-items-center" data-product-index="${productId}">
            <img src="${productDetails.images[0]}" alt="imagenDeProducto" width="250px" style="margin-left: 1rem; border-radius: .5rem;"/>
            <div class="card-body">
                <h4 class="card-title">${productDetails.name}</h4>
                <p class="card-text">
                    Precio Unidad: ${productDetails.currency} ${productDetails.cost}
                    <input type="number" min="1" value="${quantity}" class="input-cantidad form-control cantProd flex-grow" style="margin-top: 1rem;" />
                </p>
                Subtotal: <span id="subtotalProducto${productId}">${productDetails.currency} ${subtotalProducto}</span>
                <div class="btn-eliminar">
                <button class="btn btn-danger eliminar-producto" data-product-index="${productId}"><i class="bi bi-trash3-fill"> </i>Eliminar</button>
                </div>
            </div>
        </div>
      `;

      // Agrega el producto al contenedor
      carritoContainer.innerHTML += productoHTML;

      const inputCantidad = carritoContainer.querySelector(`[data-product-index="${productId}"] .input-cantidad`);

      // Escucha el evento de cambio en el input
      inputCantidad.addEventListener('change', function() {
        // Obtiene la nueva cantidad ingresada
        const nuevaCantidad = parseInt(inputCantidad.value);

        // Calcula el nuevo subtotal
        const nuevoSubtotal = productDetails.cost * nuevaCantidad;

        // Actualiza el texto del subtotal
        const subtotalSpan = document.getElementById(`subtotalProducto${productId}`);
        subtotalSpan.textContent = `${productDetails.currency} ${nuevoSubtotal}`;

        // Actualiza el subtotal global
        subtotal = carrito.reduce((acc, producto) => {
          const inputCantidad = carritoContainer.querySelector(`[data-product-index="${producto.productId}"] .input-cantidad`);
          const nuevaCantidad = parseInt(inputCantidad.value);
          return acc + productDetails.cost * nuevaCantidad;
        }, 0);
        calcularCostoEnvio();
      });
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
  }

  function eliminarProductoDelCarrito(productId) {
    // Encuentra el índice del producto en el carrito
    const productoIndex = carrito.findIndex((producto) => producto.productId === productId);

    if (productoIndex !== -1) {
      const productoElement = document.querySelector(`[data-product-index="${productId}"]`);
      if (productoElement && productoElement.parentElement) {
        // Elimina el producto del carrito
        carrito.splice(productoIndex, 1);

        // Elimina el elemento HTML del producto del carrito
        productoElement.parentElement.removeChild(productoElement);

        // Actualiza el almacenamiento local
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularCostoEnvio();
      }
    }
  }

  // Adjunta un controlador de eventos a los botones de eliminar productos
  carritoContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("eliminar-producto")) {
      const productId = event.target.getAttribute("data-product-index");
      eliminarProductoDelCarrito(productId);
    }
  });

  // Itera sobre de los productos en el carrito y muestra cada uno
  carrito.forEach((producto) => {
    mostrarProductoEnCarrito(producto.productId, producto.quantity);
  });

  const btnConfirmarCompra = document.getElementById("finalizarCompra");
  btnConfirmarCompra.addEventListener("click", finalizarCompra);

  // Función para calcular el costo de envío y actualizar los totales
  function calcularCostoEnvio() {
    let costoEnvio = 0;

    // Obtiene el tipo de envío seleccionado
    let tipoEnvioPorcentaje = 0;
    tipoEnvioRadios.forEach(radio => {
      if (radio.checked) {
        if (radio.id === 'flexRadioDefault1') {
          tipoEnvioPorcentaje = 15;
        } else if (radio.id === 'flexRadioDefault2') {
          tipoEnvioPorcentaje = 7;
        } else if (radio.id === 'flexRadioDefault3') {
          tipoEnvioPorcentaje = 5;
        }
      }
    });

    // Calcula el costo de envío en base al nuevo subtotal
    costoEnvio = (subtotal * tipoEnvioPorcentaje) / 100;

    const subtotalSpan = document.getElementById('subtotalCompra'); // Agrega esta línea
  subtotalSpan.textContent = `$${subtotal.toFixed(2)}`; // Agrega esta línea
    // Actualiza los elementos HTML con los valores calculados
    const costoEnvioSpan = document.getElementById('costoEnvio');
    costoEnvioSpan.textContent = `$${costoEnvio.toFixed(2)}`;

    
    const total = subtotal + costoEnvio;
    const totalSpan = document.getElementById('precioTotal');
    totalSpan.textContent = `$${total.toFixed(2)}`;
  }

  const tipoEnvioRadios = document.querySelectorAll('input[name="flexRadioDefault"]');
  tipoEnvioRadios.forEach(radio => {
    radio.addEventListener('change', calcularCostoEnvio);
  });

  calcularCostoEnvio();
});





/* Funcionalidad del modal */
  const btnVerModal = document.querySelector('#verModal');
  const btnOcultarModal = document.querySelector('#ocultarModal');
  const formaPagoDiv = document.querySelector('#formaPago');
  
    const formularioPago = document.getElementById("formularioPago");
    const radioTarjeta = document.getElementById("T-credito");
    const radioTransferencia = document.getElementById("T-bancaria");
    const numeroTarjeta = document.getElementById("numeroTarjeta");
    const codigoSeguridad = document.getElementById("codigoSeguridad");
    const fechaVencimiento = document.getElementById("fechaVencimiento");
    const numeroCuenta = document.getElementById("numeroCuenta");
      
    //Evento ver modal
    btnVerModal.addEventListener('click', (e) => {
      e.preventDefault();
      contenedorModal.classList.add('mostrar');
    });
  
    //Evento ocultar modal
    btnOcultarModal.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarFormaPagoSeleccionada();
      contenedorModal.classList.remove('mostrar');
    });
  
    // Evento habilitar/deshabilitar campos
    radioTarjeta.addEventListener("change", () => {
      if (radioTarjeta.checked) {
        numeroTarjeta.disabled = false;
        codigoSeguridad.disabled = false;
        fechaVencimiento.disabled = false;
        numeroCuenta.disabled = true;
        // Borra el contenido de los campos si se deselecciona
        numeroCuenta.value = ""; 
      }
    });
  
    radioTransferencia.addEventListener("change", () => {
      if (radioTransferencia.checked) {
        numeroCuenta.disabled = false;
        numeroTarjeta.disabled = true;
        codigoSeguridad.disabled = true;
        fechaVencimiento.disabled = true;
        // Borra el contenido de los campos si se deselecciona
        numeroTarjeta.value = "";
        codigoSeguridad.value = "";
        fechaVencimiento.value = "";
      }
    });
  
    // Ver forma de pago seleccionada
    function mostrarFormaPagoSeleccionada() {
      let formaPagoSeleccionada = 'No se ha seleccionado una forma de pago.';
      if (radioTarjeta.checked) {
        formaPagoSeleccionada = 'Tarjeta de crédito';
      } else if (radioTransferencia.checked) {
        formaPagoSeleccionada = 'Transferencia bancaria';
      }
      formaPagoDiv.textContent = formaPagoSeleccionada;
    }
    
    // Forma de pago inicial
    mostrarFormaPagoSeleccionada();



    function finalizarCompra() {

      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
      // Verifica si el carrito está vacío
      if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
      }
    
    
        const direccionCalle = document.querySelector("#calle");
        const direccionNumero = document.querySelector("#numero");
        const direccionEsquina = document.querySelector("#esquina");
        const formaEnvioRadios = document.querySelectorAll('input[name="flexRadioDefault"]');
        const cantidadInputs = document.querySelectorAll('.input-cantidad');
        const formaPagoTarjeta = document.getElementById("T-credito");
        const formaPagoTransferencia = document.getElementById("T-bancaria");
        const numeroTarjeta = document.getElementById("numeroTarjeta");
        const codigoSeguridad = document.getElementById("codigoSeguridad");
        const fechaVencimiento = document.getElementById("fechaVencimiento");
        const numeroCuenta = document.getElementById("numeroCuenta");
    
      
        // Validación de campos de dirección
        if (direccionCalle.value.trim() === "" || direccionNumero.value.trim() === "" || direccionEsquina.value.trim() === "") {
          alert("Los campos de dirección no pueden estar vacíos.");
          return;
        }
      
        // Validación de forma de envío
        let formaEnvioSeleccionada = false;
        formaEnvioRadios.forEach((radio) => {
          if (radio.checked) {
            formaEnvioSeleccionada = true;
          }
        });
        if (!formaEnvioSeleccionada) {
          alert("Debes seleccionar una forma de envío.");
          return;
        }
      
        // Validación de cantidad de productos
        let cantidadValida = true;
        cantidadInputs.forEach((input) => {
          const cantidad = parseInt(input.value);
          if (isNaN(cantidad) || cantidad <= 0) {
            cantidadValida = false;
          }
        });
        if (!cantidadValida) {
          alert("La cantidad para cada artículo debe ser mayor a 0.");
          return;
        }
      
        // Validación de forma de pago
        if (!formaPagoTarjeta.checked && !formaPagoTransferencia.checked) {
          alert("Debes seleccionar una forma de pago.");
          return;
        }
      
        // Validación de campos de forma de pago
        if (formaPagoTarjeta.checked && (numeroTarjeta.value.trim() === "" || codigoSeguridad.value.trim() === "" || fechaVencimiento.value.trim() === "")) {
          alert("Los campos de tarjeta de crédito no pueden estar vacíos.");
          return;
        }
      
        if (formaPagoTransferencia.checked && numeroCuenta.value.trim() === "") {
          alert("Debes insertar un número de cuenta para la transferencia bancaria.");
          return;
        }
      
        // Si todas las validaciones pasan, puedes continuar con el proceso de compra
        success();
      }

      function success() {
        Swal.fire(
            'Éxito',
            'Tu compra se ha realizado con éxito.',
            'success'
          )
    }