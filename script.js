// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Carousel Functionality
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let itemsPerView = getItemsPerView();

function getItemsPerView() {
    if (window.innerWidth >= 768) {
        return 3;
    }
    return 1;
}

function updateCarousel() {
    const items = carousel.children.length;
    const maxIndex = items - itemsPerView;
    
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    
    const percentage = -(currentIndex * (100 / itemsPerView));
    carousel.style.transform = `translateX(${percentage}%)`;
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    
    // Visual feedback for disabled buttons
    if (prevBtn.disabled) {
        prevBtn.style.opacity = '0.3';
        prevBtn.style.cursor = 'not-allowed';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
    }
    
    if (nextBtn.disabled) {
        nextBtn.style.opacity = '0.3';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const items = carousel.children.length;
    const maxIndex = items - itemsPerView;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        currentIndex = 0;
        updateCarousel();
    }
});

// Auto-play carousel
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        const items = carousel.children.length;
        const maxIndex = items - itemsPerView;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 4000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Start autoplay on load
startAutoplay();

// Stop autoplay on user interaction
carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);
prevBtn.addEventListener('click', () => {
    stopAutoplay();
    setTimeout(startAutoplay, 10000);
});
nextBtn.addEventListener('click', () => {
    stopAutoplay();
    setTimeout(startAutoplay, 10000);
});

// Initial carousel setup
updateCarousel();

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
// Updated colors to match Cornflower Palette
// Background: #1D274E (RGB: 29, 39, 78)
// Shadow/Glow: #5E9AE8 (RGB: 94, 154, 232)
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        // Dark background (950) with slight transparency
        navbar.style.background = 'rgba(29, 39, 78, 0.95)';
        // Blue glow shadow (400)
        navbar.style.boxShadow = '0 4px 20px rgba(94, 154, 232, 0.15)';
    } else {
        // Lighter background transparency
        navbar.style.background = 'rgba(29, 39, 78, 0.5)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach((card, index) => {
        // Ensure class 'observe-fade' is handled in CSS
        card.classList.add('observe-fade');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        // Remove active color (using color 300 Hex: #9EC5F2)
        link.classList.remove('text-[#9EC5F2]');
        if (link.getAttribute('href') === `#${current}`) {
            // Add active color
            link.classList.add('text-[#9EC5F2]');
        }
    });
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.bg-gradient-to-r');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = width;
            }, 100);
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Add parallax effect to sections
// Note: This modifies transform, be careful with CSS conflicts
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    // Targeting elements that have finished their entrance animation to avoid conflict
    const parallaxElements = document.querySelectorAll('.fade-in.visible, .fade-in-delay.visible');
    
    parallaxElements.forEach(el => {
        // Very subtle effect
        const speed = 0.2; 
        const yPos = -(scrolled * speed);
        // Only apply if element is in view to save performance
        // el.style.transform = `translateY(${yPos}px)`; 
        // Commented out to prevent conflict with CSS hover transforms which are important for this design
    });
});

// Cursor follow effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /* Blue 400 with opacity */
    background: rgba(94, 154, 232, 0.5); 
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, background 0.2s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        // Change cursor color on hover (Blue 600/700 mix)
        cursor.style.background = 'rgba(48, 85, 197, 0.6)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        // Revert to Blue 400
        cursor.style.background = 'rgba(94, 154, 232, 0.5)';
    });
});

// Hide cursor on mobile
if (window.innerWidth < 768) {
    cursor.style.display = 'none';
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});