document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Script
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const navElement = document.querySelector('.nav');

    if (hamburgerBtn && navLinks && navElement) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            navElement.classList.toggle('mobile-menu-open'); // Pour ajouter un style au nav si besoin
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                    navElement.classList.remove('mobile-menu-open');
                }
            });
        });
    }

    // Script pour les animations au défilement
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach(element => { observer.observe(element); });

    // --- NOUVEAU CODE POUR LE FORMULAIRE DE CONTACT ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const submitButton = document.getElementById('submitButton');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Empêche la soumission HTML par défaut

            formMessage.textContent = ''; // Réinitialiser le message
            formMessage.style.opacity = '0'; // Rendre le message invisible au début

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Validation côté client simple
            if (!name || !email || !message) {
                formMessage.textContent = 'Veuillez remplir tous les champs.';
                formMessage.style.color = 'red';
                formMessage.style.opacity = '1'; // Rendre le message visible
                return;
            }

            if (!validateEmail(email)) {
                formMessage.textContent = 'Veuillez entrer une adresse e-mail valide.';
                formMessage.style.color = 'red';
                formMessage.style.opacity = '1'; // Rendre le message visible
                return;
            }

            // Afficher un état de chargement
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            formMessage.textContent = 'Envoi en cours...';
            formMessage.style.color = 'var(--gray-50)'; // Ou une autre couleur neutre
            formMessage.style.opacity = '1'; // Rendre le message visible


            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                });

                const result = await response.json();

                if (response.ok) {
                    formMessage.textContent = result.message || 'Message envoyé avec succès !';
                    formMessage.style.color = 'green';
                    contactForm.reset(); // Réinitialiser le formulaire après succès
                } else {
                    formMessage.textContent = result.message || 'Erreur lors de l\'envoi du message.';
                    formMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Erreur de soumission du formulaire:', error);
                formMessage.textContent = 'Une erreur réseau est survenue. Veuillez réessayer.';
                formMessage.style.color = 'red';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                formMessage.style.opacity = '1'; // S'assurer que le message final est visible

                // Optionnel : faire disparaître le message après quelques secondes
                // Sauf si c'est un message d'erreur persistant qu'on voudrait laisser
                if (formMessage.style.color === 'green' || formMessage.textContent.includes('réessayer')) {
                     setTimeout(() => {
                        formMessage.style.opacity = '0';
                        // Réinitialiser le texte au cas où pour la prochaine soumission
                        setTimeout(() => {
                            if (formMessage.style.opacity === '0') { // S'il n'a pas été ré-affiché entre temps
                                formMessage.textContent = '';
                            }
                        }, 300); // Temps pour que l'opacité transitionne
                    }, 5000); // 5 secondes avant de masquer
                }
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière simple pour la validation d'email
        return re.test(String(email).toLowerCase());
    }
    // --- FIN DU NOUVEAU CODE POUR LE FORMULAIRE DE CONTACT ---
});