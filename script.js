// Navigation functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Shopping cart functionality
let cart = [];

function openLink(url) {
    // Open the URL in a new tab
    window.open(url, '_blank');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Checkout functionality would redirect to payment processor.\nTotal: $${total.toFixed(2)}\nItems: ${cart.length}`);
    
    // In a real application, this would redirect to a payment processor
    closeModal('cart-modal');
}

// Contact form handling
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Remove any existing messages
        const existingMessages = document.querySelectorAll('.form-success, .form-error');
        existingMessages.forEach(msg => msg.remove());
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
        
        const form = event.target;
        form.parentNode.insertBefore(successMessage, form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        console.log('Form submitted:', data);
    }, 1500);
}

// Modal functionality
function showModal(type) {
    const modal = document.getElementById('info-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    const modalContent = {
        shipping: {
            title: 'Shipping Information',
            body: `
                <p><strong>Free Shipping:</strong> Orders over $75</p>
                <p><strong>Standard Shipping:</strong> 3-5 business days ($6.99)</p>
                <p><strong>Express Shipping:</strong> 1-2 business days ($12.99)</p>
                <p><strong>International:</strong> 7-14 business days (rates vary)</p>
                <br>
                <p>All orders are processed within 24 hours on business days.</p>
            `
        },
        returns: {
            title: 'Returns & Exchanges',
            body: `
                <p><strong>30-Day Return Policy</strong></p>
                <p>We offer a full 30-day money-back guarantee on all products.</p>
                <br>
                <p><strong>Return Process:</strong></p>
                <ul style="margin-left: 1rem;">
                    <li>Contact our support team</li>
                    <li>Receive return authorization</li>
                    <li>Ship product back (we cover return shipping)</li>
                    <li>Refund processed within 3-5 business days</li>
                </ul>
            `
        },
        faq: {
            title: 'Frequently Asked Questions',
            body: `
                <p><strong>Q: Are your supplements third-party tested?</strong></p>
                <p>A: Yes, all products are tested for purity and potency.</p>
                <br>
                <p><strong>Q: How long until I see results?</strong></p>
                <p>A: Most customers notice improvements within 2-4 weeks.</p>
                <br>
                <p><strong>Q: Are there any side effects?</strong></p>
                <p>A: Our products use natural ingredients with minimal side effects.</p>
                <br>
                <p><strong>Q: Can I take multiple products together?</strong></p>
                <p>A: Yes, our products are designed to work synergistically.</p>
            `
        }
    };
    
    const content = modalContent[type];
    if (content) {
        title.textContent = content.title;
        body.innerHTML = content.body;
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .benefit-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
});

// Product filtering (for future enhancement)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Newsletter signup (for future enhancement)
function subscribeNewsletter(email) {
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('FitMax website loaded successfully');
    
    // Add smooth scroll to all internal links
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
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Form validation enhancement
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.interest) {
        errors.push('Please select your area of interest');
    }
    
    return errors;
}

// Enhanced form submission with validation
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    const errors = validateForm(data);
    
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-success, .form-error');
    existingMessages.forEach(msg => msg.remove());
    
    if (errors.length > 0) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.innerHTML = errors.map(error => `• ${error}`).join('<br>');
        
        const form = event.target;
        form.parentNode.insertBefore(errorMessage, form);
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
        
        const form = event.target;
        form.parentNode.insertBefore(successMessage, form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        console.log('Form submitted successfully:', data);
    }, 1500);
}