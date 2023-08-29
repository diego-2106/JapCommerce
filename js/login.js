
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
   
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const msgError = document.getElementById("msg-error");

    const login = () => {
        localStorage.username = usernameInput.value;
        localStorage.password = passwordInput.value;
        localStorage.setItem("isLoggedIn", "true");
    }

    document.addEventListener("submit", event => {
        event.preventDefault();
        if(usernameInput.value.length < 6) {
            msgError.innerHTML = "Nombre de usuario no válido: Debe tener mínimo 6 caracteres";
            msgError.style.display = "block";
        }
            else if(passwordInput.value.length < 8) {
                msgError.innerHTML = "Contraseña no válida: Debe tener mínimo 8 caracteres";
                msgError.style.display = "block";
                
            }
            else{
                login();
                window.location.replace("index.html");
            }     
    });

    document.getElementById('password').addEventListener('change',() => {
        msgError.style.display = "none";
    });
});
