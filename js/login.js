
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if (window.location.pathname !== "/index.html" && localStorage.username && localStorage.password) {
        window.location.href = "index.html";
    }

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const msgError = document.getElementById("msg-error");

    const login = () => {
        localStorage.username = usernameInput.value;
        localStorage.password = passwordInput.value;
    }

    document.addEventListener("submit", (event) => {
        event.preventDefault();
        const usernameValue = usernameInput.value.trim(); // Borra los espacios
        const passwordValue = passwordInput.value;

        const isUsernameValid = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/.test(usernameValue);
        const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(passwordValue);

        if (isUsernameValid && isPasswordValid) {
            login();
            window.location.replace("index.html");
        } else {
            msgError.innerHTML = ""; // Borra mensaje previo de error
            if (!isUsernameValid) {
                msgError.innerHTML += "Nombre de usuario no válido: solo números, letras y guiones. No puede comenzar ni terminar con guiones<br>";
            }
            if (!isPasswordValid) {
                msgError.innerHTML += "Contraseña no válida: Mínimo ocho caracteres, al menos una letra, un número y un carácter especial (@, $, !, %, *, #, ?, &)";
            }
            msgError.style.display = "block";
        }
    });

    document.getElementById('password').addEventListener('change',(event) => {
        msgError.style.display = "none";
    });
});
