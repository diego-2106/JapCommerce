const isLoggedIn = localStorage.getItem("isLoggedIn");

// Verificar si el usuario está logueado
if (isLoggedIn !== "true") {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", "Autos"); //Le digo que en el CatID se muestre Autos, igual para las otras secciones
        localStorage.setItem("catName", "Autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", "Juguetes");
        localStorage.setItem("catName", "Juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", "Muebles");
        localStorage.setItem("catName", "Muebles");
        window.location = "products.html"
    });
});

document.getElementById("logout").addEventListener("click", logout)

function logout() {
    localStorage.setItem("isLoggedIn", false)
    window.location.href = "./login.html"
}


document.addEventListener("DOMContentLoaded", () => {
    const mostrarUsuario = document.getElementById("verUsuario");
    const usuarioLogueado = localStorage.getItem("emailInput");

    if (usuarioLogueado) {
        mostrarUsuario.textContent = `${usuarioLogueado}`;
    }
});

const manual = document.getElementById('manual');

    manual.addEventListener('click', () => {
        window.open('./manual/Manual_ecommerce.pdf', '_blank');
    });
