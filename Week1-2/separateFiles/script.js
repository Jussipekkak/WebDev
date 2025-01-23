document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Nimi:', name);
    console.log('Sähköposti:', email);
    console.log('Viesti:', message);

    document.getElementById('contactForm').reset();
});
