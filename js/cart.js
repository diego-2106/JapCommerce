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
                subtotal += Subtotal;


                const subtotalSpan = cartContainer.querySelector(`#subtotalProducto${index}`);
                subtotalSpan.textContent = `${producto.currency} ${Subtotal}`;
            });
        });

        //No funciona porque no hay un elemento todavia pero lo dejamos para mas adelante
        const totalSpan = document.getElementById("cart-total");
        totalSpan.textContent = `Total: ${data.currency} ${subtotal}`;
    });

