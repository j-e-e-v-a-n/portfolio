// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelector('nav').classList.remove('nav-active'); // Close mobile menu if open
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// Typing Animation
function typeWriter(text, element, speed = 100) {
    let i = 0;
    (function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    })();
}

const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    setTimeout(() => typeWriter(text, typingText), 1000);
}

// Scroll Reveal Animation
function reveal() {
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Skill Progress Animation
function animateSkills() {
    document.querySelectorAll('.skill-progress').forEach((skill) => {
        const windowHeight = window.innerHeight;
        const elementTop = skill.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            const progress = skill.getAttribute('data-progress');
            skill.style.width = `${progress}%`;
        }
    });
}

// Contact Form Handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        to_name: "Jeevan",
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    // Clear form and show loader/feedback
    document.getElementById('contact-form').reset();
    const submitButton = document.getElementById('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Send email
    emailjs
        .send("service_uhtjbxi", "template_c41cq96", formData)
        .then(
            () => {
                // Success feedback
                submitButton.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                }, 2000);
            },
            (error) => {
                // Error feedback
                console.error("Email sending failed:", error);
                submitButton.textContent = 'Failed to Send!';
                setTimeout(() => {
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                }, 2000);
            }
        );
});

// Active Navigation Highlight
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Parallax Effect
function parallax() {
    const particles = document.querySelectorAll('.particle');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.01;
            const x = (window.innerWidth - mouseX) * speed;
            const y = (window.innerHeight - mouseY) * speed;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}


// Initialize All Animations
window.addEventListener('DOMContentLoaded', () => {
    reveal();
    animateSkills();
    highlightNav();
    parallax();
});

// Event Listeners for Scrolling
window.addEventListener('scroll', () => {
    reveal();
    animateSkills();
    highlightNav();
});