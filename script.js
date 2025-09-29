// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to your server
        console.log('Form submitted:', data);

        // Show success message
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Phone input validation - allow only digits
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('keypress', function (e) {
        // Разрешаем только цифры и специальные клавиши (backspace, tab, enter, etc.)
        if (!/[0-9]/.test(e.key) &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            e.key !== 'Enter' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight' &&
            e.key !== 'ArrowUp' &&
            e.key !== 'ArrowDown') {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('paste', function (e) {
        // При вставке проверяем содержимое
        setTimeout(() => {
            this.value = this.value.replace(/[^0-9]/g, '');
        }, 10);
    });
}

// Animate statistics numbers on scroll
const stats = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.textContent);
            animateValue(target, 0, value, 2000);
            observer.unobserve(target);
        }
    });
}, observerOptions);

stats.forEach(stat => observer.observe(stat));

// Function to animate numbers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + (element.textContent.includes('%') ? '%' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}