// Define la función showProductList en el ámbito global
async function showProductList() {
    const url = 'producto.json';

    try {
        const response = await fetch(url);
        const datos = await response.json();

        let htmlContentToAppend = "";
        for (let i = 0; i < datos.products.length; i++) {
            let product = datos.products[i];

            htmlContentToAppend += `
            <a href="products.html" class="list-group-item list-group-item-action">
<div class="row">
<div class="col-12 col-md-3">
<img src="${product.image}" alt="${product.description}" class="img-thumbnail">
</div> 
<div class="col-12 col-md-9 pt-2 pt-md-0">
<div class="d-flex w-100 justify-content-between">
<h4 class="mb-1">${product.name}</h4>
<small class="text-muted">${product.soldCount} artículos</small>
</div>
<p class="mb-1">${product.description}</p>
<h4 class="my-3">${product.currency} ${product.cost}</h4>
</div>
</div>
</a>
`;
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llama a la función showProductList dentro del evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    showProductList(); // Llama a la función aquí para que se ejecute cuando el DOM esté cargado
});



