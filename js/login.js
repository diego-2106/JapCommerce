//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
   
    const emailInput = document.getElementById("emailInput");
    const emailError = document.getElementById("emailError");
    const passwordInput = document.getElementById("passwordInput");
    const passwordError = document.getElementById("passwordError");
   

    const login = () => {
        localStorage.emailInput = emailInput.value;
        localStorage.passwordInput = passwordInput.value;
        localStorage.setItem("isLoggedIn", "true");
        
    }

// ----------------------------------------------------------------
     document.addEventListener("submit", event => {
        event.preventDefault();
        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        emailError.style.display = "none";
        passwordError.style.display = "none";
    
        if (!isValidEmail(emailInput.value) || passwordInput.value.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Credenciales de inicio de sesión no válidas. Por favor, verifica tu correo electrónico y contraseña.',
            });
        
        } else { //Si ingresa los datos correctos, le asigna un token al usuario.
          localStorage.setItem("email", emailInput);
          fetch('http://localhost:3000/login', {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json',
              },
             body: JSON.stringify({ emailInput, passwordInput }),
          })
         .then(response => response.json())
                .then(data => {
          // Store the received token in local storage
          localStorage.setItem('token', data.token);
          
          // Redirect to the main website
          location.replace("index.html");
        })
             .catch(error => {
              console.error('Login failed:', error);
        });
            login();
            window.location.replace("index.html");
        }
    });

    // ----------------------------------------------------------------
    const toggleIcon = document.getElementById("toggleIcon");
    const togglePasswordVisibility = () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.classList.remove("bi-eye");
            toggleIcon.classList.add("bi-eye-slash");
        } else {
            passwordInput.type = "password";
            toggleIcon.classList.remove("bi-eye-slash");
            toggleIcon.classList.add("bi-eye");
        }
    };
    toggleIcon.addEventListener("click", togglePasswordVisibility);
    
});

