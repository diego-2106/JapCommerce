let idusuario = 25801;
let API = `https://japceibal.github.io/emercado-api/user_cart/${idusuario}.json`;

fetch(API)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error de solicitud");
        }
        return response.json();
    })

    .then((data) => {
        let cartProd = data.articles;
        let cartContainer = document.getElementById("cart-items");
        console.log(cartProd)

        let subtotal = 0;
        function CalcularSubtotal(cantidad, precio) {
            return cantidad * precio;
        }

        cartProd.forEach((producto, index) => {
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
          </div>
          
          
            `;


           
            const cantidadInput = cartContainer.querySelector(`[data-product-index="${index}"]`);
            cantidadInput.addEventListener('input', (event) => {
                const cantidad = parseInt(event.target.value);
                const Subtotal = CalcularSubtotal(cantidad, precio);
                subtotal += Subtotal - subtotalProducto;

                subtotalProducto = Subtotal;
                const subtotalSpan = cartContainer.querySelector(`#subtotalProducto${index}`);
                subtotalSpan.textContent = `${producto.currency} ${Subtotal}`;

                calcularTotales();
            });
        });

        function calcularTotales() {
            const subtotalElement = document.getElementById('subtotal');
            const costoEnvioElement = document.getElementById('costoEnvio');
            const totalElement = document.getElementById('total');
            const tipoEnvioRadios = document.querySelectorAll('input[name="flexRadioDefault"]');

            let costoEnvio = 0;
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

            costoEnvio = subtotal * (tipoEnvioPorcentaje / 100);

            const total = subtotal + costoEnvio;
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            costoEnvioElement.textContent = `$${costoEnvio.toFixed(2)}`;
            totalElement.textContent = `$${total.toFixed(2)}`;
        }

        calcularTotales();
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
    let formaPagoSeleccionada = 'No se ha seleccionado una forma de pago';
    if (radioTarjeta.checked) {
      formaPagoSeleccionada = 'Tarjeta de crédito';
    } else if (radioTransferencia.checked) {
      formaPagoSeleccionada = 'Transferencia bancaria';
    }
    formaPagoDiv.textContent = formaPagoSeleccionada;
  }
  
  // Forma de pago inicial
  mostrarFormaPagoSeleccionada();