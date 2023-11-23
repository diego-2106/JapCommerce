function sortAndFilterProducts(products, sortOption, minPrice, maxPrice, text) {
    let result = products;

    if (minPrice) {
        result = result.filter(product => product.cost >= minPrice);
    }

    if (maxPrice) {
        result = result.filter(product => product.cost <= maxPrice);
    }

    switch (sortOption) {
        case 'sortAsc':
            result.sort((a, b) => a.cost - b.cost);
            break;
        case 'sortDesc':
            result.sort((a, b) => b.cost - a.cost);
            break;
        case 'sortByRelevance':
            result.sort((a, b) => b.soldCount - a.soldCount);
            break;
        case 'buscar':
            console.log(text)
            return result.filter(producto => producto.name.toLowerCase().includes(text.toLowerCase()));
    }

    return result;
}

// Define la función showProductList en el ámbito global
function saveProductId(productId) {
    // Guardar el ID del producto en el almacenamiento local
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "product-info.html";
}

async function showProductList() {
    const url = 'http://localhost:3000/cats/cat.json';
    // const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;


    try {
        const response = await fetch(url);
        const datos = await response.json();
        

        const products = sortAndFilterProducts(datos.products, sortOption, minPrice, maxPrice, text);

        let htmlContentToAppend = "";
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action" onclick="saveProductId(${product.id})">
                <div class="row">
                    <div class="col-12 col-md-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div> 
                    <div class="col-12 col-md-9 pt-2 pt-md-0">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                        <h4 class="my-3">${product.currency} ${product.cost}</h4>
                    </div>
                </div
            </a>
            `;
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    } catch (error) {
        console.error('Error:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    showProductList(); // Llama a la función aquí para que se ejecute cuando el DOM esté cargado

    document.getElementById('clearRangeFilter').addEventListener('click', () => {
        limpiarFiltros();
    });
});

document.getElementById('rangeFilterPrice').addEventListener('click', () => {
    minPrice = parseFloat(document.getElementById('rangeFilterPriceMin').value);
    maxPrice = parseFloat(document.getElementById('rangeFilterPriceMax').value);
    showProductList();
});


let sortOption = 'sortByRelevance';
let minPrice = null;
let maxPrice = null;
let text = "";

document.getElementById('sortAsc').addEventListener('change', () => {
    sortOption = 'sortAsc';
    showProductList();
});

document.getElementById('sortDesc').addEventListener('change', () => {
    sortOption = 'sortDesc';
    showProductList();
});

document.getElementById('sortByRelevance').addEventListener('click', () => {
    if (sortOption !== 'sortByRelevance') {
        sortOption = 'sortByRelevance';
        showProductList();
    }
});

document.getElementById('rangeFilterPrice').addEventListener('click', () => {
    minPrice = parseFloat(document.getElementById('rangeFilterPriceMin').value);
    maxPrice = parseFloat(document.getElementById('rangeFilterPriceMax').value);
    showProductList();
});

document.getElementById('buscar').addEventListener('input', () => {
    sortOption = 'buscar';
    text = document.getElementById('buscar').value;
    showProductList();
});

document.getElementById('clearRangeFilter').addEventListener('click', () => {
    limpiarFiltros();
});

function limpiarFiltros() {
    document.getElementById('rangeFilterPriceMin').value = '';
    document.getElementById('rangeFilterPriceMax').value = '';
    document.getElementById('buscar').value = '';
    
    minPrice = null;
    maxPrice = null;
    text = '';
    sortOption = 'sortByCount';
    
    showProductList();
}




