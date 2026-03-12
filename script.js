// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    // Close nav when a link is clicked on mobile
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// Custom Cursor Optimization
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Immediate update for dot
    cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;

    // Smooth trailing update for outline
    outlineX += (mouseX - outlineX) * 0.2;
    outlineY += (mouseY - outlineY) * 0.2;
    cursorOutline.style.transform = `translate(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%))`;

    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

// Add hover effects for custom cursor
const interactables = document.querySelectorAll('a, button, .hover-glow');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
});

// Typewriter Effect
const roles = [
    "Principal Network & Security Architect",
    "Multi-Cloud Strategist (GCP, AWS, Azure)",
    "AI/ML Threat Researcher",
    "Zero Trust Pioneer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const typewriterElement = document.getElementById("typewriter-text");
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 30; // Faster delete
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500;
    }
    setTimeout(typeEffect, typingDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    if (roles.length) setTimeout(typeEffect, 1000);
});

// Matrix Rain Canvas Optimization
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency on base

let width, height;
let columns, drops;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:\",.<>/?";
const fontSize = 14;

function initMatrix() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = new Float32Array(columns).fill(1); // Typed array for performance
}

let lastDrawTime = 0;
const fps = 30; // Cap matrix FPS to 30 to save CPU
const frameInterval = 1000 / fps;

function drawMatrix(timestamp) {
    if (timestamp - lastDrawTime > frameInterval) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#ffffff";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < columns; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        lastDrawTime = timestamp;
    }
    requestAnimationFrame(drawMatrix);
}

initMatrix();
requestAnimationFrame(drawMatrix);

// Debounced resize event
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initMatrix, 200);
});

// Scroll-triggered Typewriter for Section Titles
document.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll('.section-title');

    titles.forEach(title => {
        let textNodes = [];
        title.childNodes.forEach(node => {
            if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
                textNodes.push(node);
            }
        });

        if (textNodes.length > 0) {
            const textNode = textNodes[0];
            const textContent = textNode.nodeValue;

            const span = document.createElement('span');
            span.className = 'section-typing';
            span.setAttribute('data-text', textContent);
            span.textContent = '';

            title.insertBefore(span, textNode);
            title.removeChild(textNode);
        }
    });

    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');
                const typingSpan = entry.target.querySelector('.section-typing');
                if (typingSpan) {
                    const text = typingSpan.getAttribute('data-text');
                    let charIndex = 0;
                    typingSpan.classList.add('typing-active');

                    function typeChar() {
                        if (charIndex < text.length) {
                            typingSpan.textContent += text.charAt(charIndex);
                            charIndex++;
                            // Randomize typing speed for realism (30ms - 70ms)
                            setTimeout(typeChar, 30 + Math.random() * 40);
                        } else {
                            setTimeout(() => typingSpan.classList.remove('typing-active'), 1500);
                        }
                    }
                    setTimeout(typeChar, 300); // Small initial delay
                }
            }
        });
    }, observerOptions);

    titles.forEach(title => {
        sectionObserver.observe(title);
    });
});
