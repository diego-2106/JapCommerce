const selectPuntaje = document.querySelector('select[name="select-puntaje"]');

//--------------- SE AGREGO PARA VER LOS DETALLES DE LOS PRODUCTOS------------------//

async function showProductsDetails() {
    const selectedProductId = localStorage.getItem("selectedProductId");
    const url = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

    try {
        const response = await fetch(url);
        const product = await response.json();

        let productDetailsHTML = `
        <div class="row">
        <div class="col-md-6">
            <h2 class="h2-prodname">${product.name}</h2>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p><strong>Precio:</strong> ${product.currency} ${product.cost}</p>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Cantidad de vendidos:</strong> ${product.soldCount}</p>
        </div>
    </div>
    <p class="imgilustrativas"><strong>Imágenes ilustrativa:</strong></p>
    <div class="images-product">
        
`;
        if (product.images && product.images.length > 0) {
            product.images.forEach(image => {
                productDetailsHTML += `<img src="${image}" alt="Imagen">`;
            });
        }

        productDetailsHTML += '</div>';

        // Insertar el contenido en el div "contenedor-info"
        document.querySelector("#contenedor-info").innerHTML = productDetailsHTML;
    } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
    }
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

// Función para crear el HTML de un comentario
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

// Función para obtener el HTML de las estrellas de calificación
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


// Función para obtener la fecha actual 
function getCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('es-ES', options);
}


/*------------------------Productos relacionados----------------------*/
async function productosRel() {
    const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;

    try {
        const response = await fetch(url);
        const products = await response.json(); // Cambio "datos" a "products"

        let relacionados = "";
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            relacionados += `
            <a href="product-info.html" class="list-group-item list-group-item-action" onclick="saveProductId(${product.id})">
                <div class="row">
                    <div class="col-12 col-md-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div> 
                    <div class="col-12 col-md-9 pt-2 pt-md-0">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                        </div>
                    </div>
                </div>
            </a>
            `;
        }
        document.getElementById("contenedor-relacionados").innerHTML = relacionados;
    } catch (error) {
        console.error('Error:', error);
    }
}
