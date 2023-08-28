function sortAndFilterProducts(products, sortOption, minPrice, maxPrice) {
    let result = products;

    if (minPrice) {
        result = result.filter(product => product.cost >= minPrice);
    }

    if (maxPrice) {
        result = result.filter(product => product.cost <= maxPrice);
    }

    switch (sortOption) {
        case 'sortAsc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'sortDesc':
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'sortByPrice':
            result.sort((a, b) => a.cost - b.cost);
            break;
        case 'sortByRelevance':
            result.sort((a, b) => b.soldCount - a.soldCount);
            break;
    }

    return result;
}

let sortOption = 'sortByCount';
let minPrice = null;
let maxPrice = null;

document.getElementById('sortAsc').addEventListener('change', () => {
    sortOption = 'sortAsc';
    showProductList();
});

document.getElementById('sortDesc').addEventListener('change', () => {
    sortOption = 'sortDesc';
    showProductList();
});

document.getElementById('sortByCount').addEventListener('change', () => {
    sortOption = 'sortByCount';
    showProductList();
});

document.getElementById('rangeFilterCount').addEventListener('click', () => {
    minPrice = document.getElementById('rangeFilterCountMin').value;
    maxPrice = document.getElementById('rangeFilterCountMax').value;
    showProductList();
});

document.getElementById('clearRangeFilter').addEventListener('click', () => {
    document.getElementById('rangeFilterCountMin').value = '';
    document.getElementById('rangeFilterCountMax').value = '';
    minPrice = null;
    maxPrice = null;
    showProductList();
});


// Define la función showProductList en el ámbito global
async function showProductList() {
    const url = 'producto.json';

    try {
        const response = await fetch(url);
        const datos = await response.json();

        const products = sortAndFilterProducts(datos.products, sortOption, minPrice, maxPrice);

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

