// async function showProductsDetails () {

//     const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/`;
//     // Obtener el ID del producto seleccionado del almacenamiento local
//     // const selectedProductId = localStorage.getItem("selectedProductId");
  
   
//         try {
            
//             const response = await fetch(productDetailsUrl);
//             const datos = await response.json();


//             const products = sortAndFilterProducts(datos.products);
            

//             // Crear el contenido HTML con los detalles del producto

//             let productDetailsHTML = "";
//                 for (let i = 0; i < products.length; i++) {
//             let product = products[i];
//              productDetailsHTML += `
//                 <div class="row">
//                     <div class="col-md-6">
//                         <img src="${product.image}" alt="${product.name}" class="img-fluid">
//                     </div>
//                     <div class="col-md-6">
//                         <h2>${product.name}</h2>
//                         <p>${product.description}</p>
//                         <p>${product.currency} ${product.cost}</p>
//                         <!-- Agrega otros detalles del producto aquí -->
//                     </div>
//                 </div>
//             `;

//             // Insertar el contenido en el div "product-details-container"
//             document.querySelector("#contenedor-info").innerHTML = productDetailsHTML;
//         } catch (error) {
//             console.error("Error al obtener los detalles del producto:", error);
//         }
//     }
// }

// async function showProductsDetails() {
//     const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/`;

//     try {
//         const response = await fetch(productDetailsUrl);
//         const datos = await response.json();


        
//             const productDetailsHTML += `
//                 <div class="row">
//                     <div class="col-md-6">
//                         <img src="${product.image}" alt="${product.name}" class="img-fluid">
//                     </div>
//                     <div class="col-md-6">
//                         <h2>${product.name}</h2>
//                         <p>${product.description}</p>
//                         <p>${product.currency} ${product.cost}</p>
//                         <!-- Agrega otros detalles del producto aquí -->
//                     </div>
//                 </div>
//             `;
//         }

//         // Insertar el contenido en el div "product-details-container"
//         document.querySelector("#contenedor-info").innerHTML = productDetailsHTML;
//     } catch (error) {
//         console.error("Error al obtener los detalles del producto:", error);
//     }

//     document.addEventListener('DOMContentLoaded', () => {
//         showProductsDetails();
//     })

// async function showProductsDetails() {
//     const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/`;

//     try {
//         const response = await fetch(productDetailsUrl);
//         const datos = await response.json();

//         if (datos.products.length > 0) {
//             const product = datos.products[0];
            
//             const productDetailsHTML = `
//                 <div class="row">
//                     <div class="col-md-6">
//                         <img src="${product.image}" alt="${product.name}" class="img-fluid">
//                     </div>
//                     <div class="col-md-6">
//                         <h2>${product.name}</h2>
//                         <p>${product.description}</p>
//                         <p>${product.currency} ${product.cost}</p>
//                         <!-- Agrega otros detalles del producto aquí -->
//                     </div>
//                 </div>
//             `;

//             // Insertar el contenido en el div "contenedor-info"
//             document.querySelector("#contenedor-info").innerHTML = productDetailsHTML;
//         } else {
//             console.error("La respuesta de la API no contiene productos.");
//         }
//     } catch (error) {
//         console.error("Error al obtener los detalles del producto:", error);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     showProductsDetails();
// });


// async function showProductsDetails() {
//     const selectedProductId = localStorage.getItem("selectedProductId");
//     const url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("selectedProductId")}.json`;

//     try {
//         const response = await fetch(url);
//         const datos = await response.json();

//         let productDetailsHTML = "";
//         for (let i = 0; i < products.length; i++) {
//             const product = products[i];
//             productDetailsHTML += `
//                 <div class="row">
//                     <div class="col-md-6">
//                         <img src="${product.images}" alt="${product.name}" class="img-fluid">
//                     </div>
//                 </div>
//             `;
//         }

//         // Insertar el contenido en el div "contenedor-info"
//         document.querySelector("#contenedor-info").innerHTML = productDetailsHTML;
//     } catch (error) {
//         console.error("Error al obtener los detalles del producto:", error);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     showProductsDetails();
// });



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
                productDetailsHTML += `<img src="${image}" alt="Imagen" style="width: 300px; margin-right: .5rem; border-radius: .3rem">`;
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

        function getStarIcons(score) {
            const maxStars = 5; // Máximo número de estrellas
            const filledStars = Math.round(score); // Número de estrellas llenas

            let starIcons = '';

            for (let i = 0; i < maxStars; i++) {
                if (i < filledStars) {
                    starIcons += '<i class="fa fa-star filled"></i>';
                } else {
                    starIcons += '<i class="fa fa-star"></i>';
                }
            }

            return starIcons;
        }

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