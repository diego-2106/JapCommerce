const isLoggedIn = localStorage.getItem("isLoggedIn");

// Verificar si el usuario está logueado
if (isLoggedIn !== "true") {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
document.getElementById("logout").addEventListener("click", logout)

function logout(){
    localStorage.setItem("isLoggedIn",false)
    window.location.href = "./login.html"
}