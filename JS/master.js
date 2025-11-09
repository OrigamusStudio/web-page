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
    /* SCRIPT DE MODAL DE GALERÍA */
    /* ============================================= */

    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img-content");
    const closeBtn = document.querySelector(".modal-close");
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");

    const galleryImages = document.querySelectorAll(".gallery-grid-alt img");
    
    let currentIndex = 0;

    if (modal && modalImg && closeBtn && galleryImages.length > 0 && prevBtn && nextBtn) {

        function showImage(index) {
            currentIndex = index;
            
            modalImg.src = galleryImages[index].src;
            modalImg.alt = galleryImages[index].alt;

            if (index === 0) {
                prevBtn.disabled = true; 
            } else {
                prevBtn.disabled = false;
            }

            if (index === galleryImages.length - 1) {
                nextBtn.disabled = true; 
            } else {
                nextBtn.disabled = false;
            }
        }

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function () {
                modal.classList.add('active'); 
                showImage(index);
            });
        });

        function closeModal() {
            modal.classList.remove('active');
        }

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        nextBtn.addEventListener('click', function() {
            if (currentIndex < galleryImages.length - 1) {
                showImage(currentIndex + 1);
            }
        });

        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                showImage(currentIndex - 1);
            }
        });
    }

    /* ============================================= */
    /* SCRIPT DE "LEER MÁS" (DESCRIPCIÓN PROYECTO) */
    /* ============================================= */

    const expandBtn = document.getElementById("expand-description-btn");
    const expandContent = document.getElementById("expandable-description");

    if (expandBtn && expandContent) {
        
        expandBtn.addEventListener('click', function() {
            expandContent.classList.toggle('expanded');
            this.classList.toggle('expanded'); 

            const textNode = this.childNodes[0];

            if (this.classList.contains('expanded')) {
                textNode.nodeValue = 'Leer menos '; 
            } else {
                textNode.nodeValue = 'Leer más '; 
            }
        });
    }
});