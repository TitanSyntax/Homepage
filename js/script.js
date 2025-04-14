// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle the mobile menu
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // Remove active class from all links
            navItems.forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            item.classList.add('active');
        });
    });
    
    // Set active class for current page in navigation
    const currentPage = window.location.pathname.split("/").pop();
    const currentHash = window.location.hash;
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        
        // Check if it's a hash link and we're on index.html
        if (currentPage === 'index.html' || currentPage === '') {
            if (href === currentHash || (currentHash === '' && href === '#home')) {
                item.classList.add('active');
            }
        }
        // Check if it's a page link
        else if (href === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Header scroll effect - only add shadow, no hiding
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        // Add shadow when scrolled
        if (window.scrollY > 50) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the data to a server
            // For this example, we'll just log it and show a success message
            console.log({ name, email, subject, message });
            
            // Show success message (in a real project, this would happen after server response)
            const formElements = contactForm.querySelectorAll('input, textarea, button');
            formElements.forEach(element => {
                element.disabled = true;
            });
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerText = 'Thank you! Your message has been sent successfully.';
            contactForm.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                formElements.forEach(element => {
                    element.disabled = false;
                });
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Add animations to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add additional styles for animations
document.addEventListener('DOMContentLoaded', () => {
    // Add the animation styles to the document
    const style = document.createElement('style');
    style.textContent = `
        .header-shadow {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        header {
            transition: box-shadow 0.3s ease;
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideDown 0.3s ease forwards;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
        
        .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            background-color: rgba(46, 204, 113, 0.1);
            color: #2ecc71;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Blog search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (searchInput) {
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.blog-tags span'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const match = title.includes(searchTerm) || 
                             content.includes(searchTerm) || 
                             tags.some(tag => tag.includes(searchTerm));
                
                card.style.display = match ? 'grid' : 'none';
            });
        };
        
        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
        
        // Search as user types
        searchInput.addEventListener('input', performSearch);
        
        // Search on Enter key
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Discord username copy functionality
document.addEventListener('DOMContentLoaded', () => {
    const discordLink = document.querySelector('[data-discord]');
    const copyNotification = document.getElementById('copyNotification');
    
    if (discordLink && copyNotification) {
        discordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const username = discordLink.getAttribute('data-discord');
            
            // Copy to clipboard
            navigator.clipboard.writeText(username).then(() => {
                // Show notification
                copyNotification.classList.add('show');
                
                // Hide notification after 2 seconds
                setTimeout(() => {
                    copyNotification.classList.remove('show');
                }, 2000);
            });
        });
    }
}); 