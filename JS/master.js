fetch("navbar.html")
  .then(res => res.text())
  .then(data => document.getElementById("navbar-placeholder").innerHTML = data);

fetch("footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer-placeholder").innerHTML = data);

/*AREA DE CONTACTO*/
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // evita recarga
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
