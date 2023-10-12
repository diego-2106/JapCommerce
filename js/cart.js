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
            <img src="${producto.image}" alt="imagenDeProducto" />
            Producto: ${producto.name}, Precio Unidad: ${producto.currency} ${producto.unitCost} Cantidad: <input type="number" class="cantProd" value="${cantidad}" min="1" data-product-index=
            Subtotal: <span id-"subtotalProducto${index}">${producto.currency} ${subtotalProducto}</span>
            <br></br>
            `;
        });
    })

