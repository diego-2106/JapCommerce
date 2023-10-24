const selectPuntaje = document.querySelector('select[name="select-puntaje"]');

//--------------- SE AGREGO PARA VER LOS DETALLES DE LOS PRODUCTOS------------------//

async function showProductsDetails() {
    const selectedProductId = localStorage.getItem("selectedProductId");
    const url = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

    try {
        const response = await fetch(url);
        const product = await response.json();

        let productDetailsHTML = `
        <div class="contenido container">
        <div class="row">
        <div class="col-md-6">
            <h2 class="h2-prodname">${product.name}</h2>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p><strong>Precio:</strong> ${product.currency} ${product.cost}</p>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Cantidad de vendidos:</strong> ${product.soldCount}</p>
        </div>
    </div>
    </div>
    <p class="imgilustrativas container" style="font-size: 1.3rem"><strong>Imágenes ilustrativa:</strong></p>
    <div class="images-product">
        
`;

        let relatedProductsHTML = '';

        product.relatedProducts.forEach(relProduct => {
            relatedProductsHTML += `
            <div onclick="setProdName('${relProduct.name}', '${relProduct.id}', '${relProduct.description}')" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${relProduct.image}" alt="${relProduct.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${relProduct.name}</h4>
                        </div>
                    </div>
                </div>
            </div>`;
        })


        if (product.images && product.images.length > 0) {
            product.images.forEach(image => {
                productDetailsHTML += `<img src="${image}" alt="Imagen">`;
            });
        }

        productDetailsHTML += '</div>';

        // Insertar el contenido en el div "contenedor-info"
        document.querySelector("#contenedor-info").innerHTML = productDetailsHTML;
        document.querySelector("#related-products-container").innerHTML = relatedProductsHTML;
    } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
    }
}

function setProdName(prodName, prodId, prodDescription) {
    localStorage.setItem("prodName", prodName);
    localStorage.setItem("selectedProductId", prodId);
    window.location = "product-info.html"
}

document.addEventListener('DOMContentLoaded', () => {
    showProductsDetails();
});


//-----------------------------------------------------------------------------------//

//----------------------- COMENTARIOS--------------------------------//

async function verComentarios() {
    const selectedProductId = localStorage.getItem("selectedProductId");

    const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`;

    try {

        const responseComments = await fetch(urlComments);
        const comments = await responseComments.json();
        console.log(comments);

        let commentsProductHTML = "";

        comments.forEach(comment => {
            const ratingStars = `
                <div class="rating">
                    ${getStarIcons(comment.score)}
                </div>
            `;

            commentsProductHTML += `
                <div class="row comment">
                    <div class="col-md-6">
                        <p>Puntaje: ${ratingStars}</p>
                        <p>Descripción: ${comment.description}</p>
                        <p>Usuario: ${comment.user}</p>
                        <p>Fecha: ${comment.dateTime}</p>
                    </div>
                </div>
            `;
        });


        // Agrega los comentarios al elemento con la clase "comments-info"
        const commentsInfo = document.querySelector(".comments-info");
        commentsInfo.innerHTML = commentsProductHTML;

    } catch (error) {
        console.error("Error al cargar los comentarios:", error);
    }
}

// Llama a la función para cargar los comentarios cuando se carga la página
window.addEventListener("load", verComentarios);
//-----------------------------------------------------------------------------------//

//-----------------------------------------Agregar comentarios--------------------------
document.getElementById('publicar').addEventListener('click', function () {
    let userName = document.querySelector('input[name="user-name"]').value;
    let commentContent = document.querySelector('textarea[name="comment-content"]').value;
    let puntaje = selectPuntaje.value

    if (puntaje === "value1") {
        puntaje = 1;
    } else if (puntaje === "value2") {
        puntaje = 2;
    } else if (puntaje === "value3") {
        puntaje = 3;
    } else if (puntaje === "value4") {
        puntaje = 4;
    } else if (puntaje === "value5") {
        puntaje = 5;
    } else {
        puntaje = 0;
    }

    let dateTime = getCurrentDate();

    let nuevoComentario = createCommentHTML(userName, puntaje, commentContent, dateTime);

    let commentsContainer = document.querySelector('.comments-info');
    commentsContainer.appendChild(nuevoComentario);

    document.querySelector('input[name="user-name"]').value = '';
    document.querySelector('textarea[name="comment-content"]').value = '';
    document.querySelector('select[name="select-puntaje"]').value = '';
});

// función para crear el HTML de un comentario
function createCommentHTML(userName, selectPuntaje, commentContent, dateTime) {
    const ratingStars = `
        <div class="rating">
            ${getStarIcons(selectPuntaje)}
        </div>
    `;

    const commentHTML = document.createElement('div');
    commentHTML.classList.add('row', 'comment');
    commentHTML.innerHTML = `
        <div class="col-md-6">
            <p>Puntaje: ${ratingStars}</p>
            <p>Descripción: ${commentContent}</p>
            <p>Usuario: ${userName}</p>
            <p>Fecha: ${dateTime}</p>
        </div>
    `;

    return commentHTML;
}

// función para obtener el HTML de las estrellas de calificación
function getStarIcons(puntaje) {
    let estrellaLlena =
        '<i class="fa fa-star filled"></i>';
    let estrellaVacia =
        '<i class="fa fa-star"></i>';

    let estrellasHTML = "";

    for (let i = 0; i < 5; i++) {
        if (i < puntaje) {
            estrellasHTML += estrellaLlena;
        } else {
            estrellasHTML += estrellaVacia;
        }
    }

    return estrellasHTML;
}


// función para obtener la fecha actual 
function getCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('es-ES', options);
}


/*------------------------Productos relacionados----------------------*/
// carga el archivo JSON "producto.json"
fetch("producto.json")
    .then((response) => response.json())
    .then((data) => {
        // La variable "data" contiene los productos relacionados del archivo JSON
        mostrarProductosRelacionados(data);
    })
    .catch((error) => console.error("Error al cargar el archivo JSON: ", error));

function mostrarProductosRelacionados(productosRelacionados) {
    const contenedorProductosRelacionados = document.getElementById(
        "related-products-container"
    );

    const categoriaProductoActual = obtenerCategoriaDelProductoActual();

    // filtra los productos relacionados por la categoría actual
    const productosFiltrados = productosRelacionados.products.filter(
        (producto) => producto.category === categoriaProductoActual
    );

    // limpia el contenido actual del contenedor
    contenedorProductosRelacionados.innerHTML = "";

    // recorre la lista de productos relacionados y agrega cada uno al contenedor
    productosFiltrados.forEach((producto) => {
        const productoRelacionado = document.createElement("div");
        productoRelacionado.classList.add("col-md-4"); ``

        contenedorProductosRelacionados.appendChild(productoRelacionado);
    });
}


function obtenerCategoriaDelProductoActual() {

}

function agregarProductoAlCarrito(productId, quantity) {
    // Obtener el carrito actual del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar el producto al carrito
    carrito.unshift({ productId, quantity });

    // Guardar el carrito actualizado en el localstorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
document.getElementById("comprar").addEventListener("click", function () {
    // Obtener el ID del producto que se va a comprar
    const selectedProductId = localStorage.getItem("selectedProductId");
    const productQuantity = 1;

    // Agregar el producto al carrito
    agregarProductoAlCarrito(selectedProductId, productQuantity);

    // Alerta que se agrego al carro
    success();

});

function success() {
    Swal.fire(
        'Éxito',
        'Tu producto se ha agregado al carrito.',
        'success'
      )
}





