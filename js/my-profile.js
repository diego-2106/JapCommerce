document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');
    const avatarSelectionForm = document.getElementById('avatarSelectionForm');
    const emailInput = document.getElementById('email');
    const currentAvatarImage = document.getElementById('currentAvatarImage');
    const avatarSelectionModal = new bootstrap.Modal(document.getElementById('avatarSelectionModal'));

    // Verificar si el usuario está logueado (simulado)
    const isUserLoggedIn = true; // Cambia esto según tu lógica real de autenticación

    // Función para cargar los datos del almacenamiento local al formulario
    function loadProfileData() {
        const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
        emailInput.value = storedData.email || '';
        for (const key in storedData) {
            if (key !== 'email') {
                const inputField = document.getElementById(key);
                if (inputField) {
                    inputField.value = storedData[key];
                }
            }
        }

        // Cargar la imagen del almacenamiento local
        currentAvatarImage.src = storedData.avatar || 'img/img_perfil.png';
    }

    // Función para guardar los datos en el almacenamiento local
    function saveProfileData(formData) {
        localStorage.setItem('profileData', JSON.stringify(formData));
    }

    // Evento de envío del formulario
    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validar campos obligatorios
        if (isUserLoggedIn) {
            const storedEmail = localStorage.getItem('emailInput');
            if (!storedEmail || !document.getElementById('firstName').value || !document.getElementById('lastName1').value) {
                alert('Por favor, complete los campos obligatorios.');
                return;
            }

            // Mostrar el correo electrónico en el campo correspondiente
            document.getElementById('email').value = storedEmail;

            // Guardar datos en el almacenamiento local
            const formData = {
                email: storedEmail,
                firstName: document.getElementById('firstName').value,
                middleName: document.getElementById('middleName').value,
                lastName1: document.getElementById('lastName1').value,
                lastName2: document.getElementById('lastName2').value,
                phone: document.getElementById('phone').value,
                avatar: currentAvatarImage.src,
            };

            saveProfileData(formData);
            showNotification('Datos guardados correctamente.');
        } else {
            alert('No puedes acceder al perfil sin estar logueado.');
        }



    });

    // Evento de envío del formulario de cambio de imagen
    avatarSelectionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener la imagen seleccionada
        const selectedOption = document.querySelector('.btn-group .active').id;
        const selectedAvatarImage = document.getElementById('selectedAvatarImage');

        if (selectedOption === 'btnAvatarFile') {
            const avatarImageFileInput = document.getElementById('avatarImageFile');
            if (avatarImageFileInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    selectedAvatarImage.src = e.target.result;

                    // Guardar la imagen en el almacenamiento local
                    const formData = JSON.parse(localStorage.getItem('profileData')) || {};
                    formData.avatar = e.target.result;
                    saveProfileData(formData);
                    showNotification('Imagen guardada correctamente.');
                };
                reader.readAsDataURL(avatarImageFileInput.files[0]);
            }
        } else if (selectedOption === 'btnAvatarURL') {
            const avatarImageURLInput = document.getElementById('avatarImageURL');
            selectedAvatarImage.src = avatarImageURLInput.value;

            // Guardar la URL de la imagen en el almacenamiento local
            const formData = JSON.parse(localStorage.getItem('profileData')) || {};
            formData.avatar = avatarImageURLInput.value;
            saveProfileData(formData);
            showNotification('Imagen guardada correctamente.');
        }

        // Cerrar el modal después de seleccionar la imagen
        setTimeout(function () {
            avatarSelectionModal.hide();

            // Actualizar la imagen después de cerrar el modal
            setTimeout(function () {
                const formData = JSON.parse(localStorage.getItem('profileData')) || {};
                currentAvatarImage.src = formData.avatar || 'img/img_perfil.png';
            }, 100);
        }, 100);
    });

    // Cambiar la imagen según la opción seleccionada
    function changeImageSource() {
        const selectedOption = document.querySelector('.btn-group .active').id;
        const selectedAvatarImage = document.getElementById('selectedAvatarImage');

        if (selectedOption === 'btnAvatarFile') {
            selectedAvatarImage.src = URL.createObjectURL(document.getElementById('avatarImageFile').files[0]);
        } else if (selectedOption === 'btnAvatarURL') {
            selectedAvatarImage.src = document.getElementById('avatarImageURL').value;
        }
    }

    // Evento de cambio en la opción de archivo o URL
    document.querySelector('.btn-group').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const panelAvatarFile = document.getElementById('panelAvatarFile');
            const panelAvatarURL = document.getElementById('panelAvatarURL');

            panelAvatarFile.style.display = event.target.id === 'btnAvatarFile' ? 'block' : 'none';
            panelAvatarURL.style.display = event.target.id === 'btnAvatarURL' ? 'block' : 'none';
            changeImageSource();
        }
    });

    // Evento de cambio en el archivo de imagen
    document.getElementById('avatarImageFile').addEventListener('change', function () {
        changeImageSource();
    });

    // Evento de cambio en la URL de la imagen
    document.getElementById('avatarImageURL').addEventListener('input', function () {
        changeImageSource();
    });

    // Evento para limpiar la URL de la imagen
    document.getElementById('clearImageURL').addEventListener('click', function () {
        document.getElementById('avatarImageURL').value = '';
        changeImageSource();
    });

    // Función para mostrar notificación
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.innerText = message;
        notification.classList.add('show');

        // Ocultar la notificación después de 3 segundos
        setTimeout(function () {
            notification.classList.remove('show');
        }, 3000);
    }

    // Cargar datos al formulario al cargar la página
    loadProfileData();
});
