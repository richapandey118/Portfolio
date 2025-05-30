// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    // Apply saved theme or default
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Update checkbox if theme is dark
        if (currentTheme === 'dark') {
            document.getElementById('checkbox').checked = true;
        }
    }
    
    // Theme switch handler
    const themeSwitch = document.getElementById('checkbox');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Function to toggle the menu
    function toggleMenu() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open'); // Add class to body to prevent scrolling when menu is open
    }

    // Add event listener to hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu when a nav link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside the menu
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
            toggleMenu();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add resize listener to handle menu visibility on screen size change
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form data
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add scroll animation for elements
    function animateOnScroll() {
        const elements = document.querySelectorAll('.education-card, .project-card, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }

    // Add animate class to already visible elements on load
    window.addEventListener('load', animateOnScroll);
    
    // Add animate class to elements as they come into view while scrolling
    window.addEventListener('scroll', animateOnScroll);
}); 