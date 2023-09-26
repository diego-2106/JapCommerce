const switchButton = document.getElementById('switch');
        const body = document.body;

        // Función para activar o desactivar el modo oscuro
        function toggleDarkMode() {
            body.classList.toggle('dark');
            switchButton.classList.toggle('active');
            // Guardar el estado en localStorage
            const isDarkModeEnabled = body.classList.contains('dark');
            localStorage.setItem('darkModeEnabled', isDarkModeEnabled);
        }

        // Verificar si el modo oscuro estaba habilitado al cargar la página
        const isDarkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
        if (isDarkModeEnabled) {
            toggleDarkMode();
        }

        // Escucha el evento de clic en el botón
        switchButton.addEventListener('click', toggleDarkMode);