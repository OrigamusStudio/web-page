document.addEventListener("DOMContentLoaded", function () {

    fetch("/navbar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            const toggleButton = document.getElementById('nav-toggle-btn');
            const navLinks = document.getElementById('nav-links');

            if (toggleButton && navLinks) {
                toggleButton.addEventListener('click', function () {
                    toggleButton.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });
            }
        });

    fetch("/footer.html")
        .then(res => res.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);


    const form = document.getElementById('contactForm');
    if (form) {
        const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    successMessage.style.display = 'block';
                    form.reset();
                } else {
                    alert('Ocurrió un error al enviar el mensaje.');
                }
            }).catch(error => {
                alert('Error de conexión: ' + error);
            });
        });
    }

    /* ============================================= */
    /* SCRIPT DE MODAL DE GALERÍA (AÑADIR ESTO)   */
    /* ============================================= */

    // 1. Encontrar los elementos del modal
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img-content");
    const closeBtn = document.querySelector(".modal-close");
    // NUEVO: Botones de navegación
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");

    // 2. Encontrar TODAS las imágenes de la galería
    const galleryImages = document.querySelectorAll(".gallery-grid-alt img");
    
    // NUEVO: Variable para guardar el índice actual
    let currentIndex = 0;

    // 3. Solo ejecutar si encontramos estos elementos en la página
    if (modal && modalImg && closeBtn && galleryImages.length > 0 && prevBtn && nextBtn) {

        // NUEVO: Función para mostrar una imagen específica
        function showImage(index) {
            // Actualizar el índice
            currentIndex = index;
            
            // Actualizar la imagen y alt
            modalImg.src = galleryImages[index].src;
            modalImg.alt = galleryImages[index].alt;

            // Ocultar/mostrar botones de navegación
            if (index === 0) {
                prevBtn.disabled = true; // Deshabilita el botón 'prev'
            } else {
                prevBtn.disabled = false;
            }

            if (index === galleryImages.length - 1) {
                nextBtn.disabled = true; // Deshabilita el botón 'next'
            } else {
                nextBtn.disabled = false;
            }
        }

        // 4. Añadir un 'click' a CADA imagen de la galería
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function () {
                modal.classList.add('active'); 
                showImage(index); // Llama a la nueva función
            });
        });

        // 5. Función para cerrar el modal
        function closeModal() {
            modal.classList.remove('active');
        }

        // 6. Asignar la función de cerrar al botón "X"
        closeBtn.addEventListener('click', closeModal);

        // 7. (Opcional) Cerrar el modal al hacer clic en el fondo
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // NUEVO: 8. Click listener para el botón 'Siguiente'
        nextBtn.addEventListener('click', function() {
            if (currentIndex < galleryImages.length - 1) {
                showImage(currentIndex + 1);
            }
        });

        // NUEVO: 9. Click listener para el botón 'Anterior'
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                showImage(currentIndex - 1);
            }
        });
    }

    /* ============================================= */
    /* SCRIPT DE "LEER MÁS" (DESCRIPCIÓN PROYECTO) */
    /* ============================================= */

    // (Se ejecuta dentro del DOMContentLoaded principal)
    const expandBtn = document.getElementById("expand-description-btn");
    const expandContent = document.getElementById("expandable-description");

    if (expandBtn && expandContent) {
        
        expandBtn.addEventListener('click', function() {
            // 1. Alternar las clases (esto activa la animación CSS)
            expandContent.classList.toggle('expanded');
            this.classList.toggle('expanded'); 

            // 2. Encontrar el nodo de texto (el texto "Leer más")
            const textNode = this.childNodes[0];

            // 3. Cambiar SOLO el texto
            if (this.classList.contains('expanded')) {
                textNode.nodeValue = 'Leer menos '; // Cambia solo el texto
                // ¡YA NO TOCAMOS LA FLECHA!
            } else {
                textNode.nodeValue = 'Leer más '; // Cambia solo elV texto
                // ¡YA NO TOCAMOS LA FLECHA!
            }
        });
    }
});