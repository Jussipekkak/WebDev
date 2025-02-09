document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const links = navLinks.querySelectorAll('a');
    
    function updateNavigation() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 768) {
            // Poista Etusivu-linkki ensin
            if (links[0].textContent === 'Etusivu') {
                links[0].remove();
            }
            
            // Jos näyttö on vielä pienempi, poista Yhteystiedot-linkki
            if (screenWidth <= 600 && links.length > 2) {
                links[links.length - 1].remove();
            }
        }
    }

    // Lisää tapahtumankuuntelija näytön koon muutoksille
    window.addEventListener('resize', updateNavigation);
    
    // Suorita aluksi
    updateNavigation();

    // Nykyinen vuoden asetus
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        console.log('Lomake lähetetty:', { name, email, message });
        
        contactForm.reset();
        
        alert('Viestisi on lähetetty!');
    });
});