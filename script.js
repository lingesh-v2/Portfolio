"use strict";

/* =====================================
   HEADER SCROLLED STATE
===================================== */

const header = document.querySelector(".header");

const handleHeaderScroll = () => {
    if (header) {
        if (window.scrollY > 25) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
};

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();


/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    /* Close menu after selecting a navigation link */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    /* Close menu when clicking outside */
    document.addEventListener("click", (e) => {
        if (
            navbar.classList.contains("open") &&
            !navbar.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            navbar.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}


/* =====================================
   TYPING ANIMATION
===================================== */

const typingText = document.getElementById("typing-text");

if (typingText) {
    const roles = [
        "AI Developer",
        "Web Developer",
        "Python Programmer",
        "Computer Science Student"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (!deleting) {
            characterIndex++;
            typingText.textContent = currentRole.substring(0, characterIndex);

            if (characterIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1600);
                return;
            }
        } else {
            characterIndex--;
            typingText.textContent = currentRole.substring(0, characterIndex);

            if (characterIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeEffect, deleting ? 40 : 85);
    }

    typeEffect();
}


/* =====================================
   COPYRIGHT YEAR
===================================== */

const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =====================================
   BACK TO TOP
===================================== */

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 350);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =====================================
   ACTIVE NAVIGATION SPY
===================================== */

const sections = document.querySelectorAll("main section[id]");

if (sections.length > 0 && navLinks.length > 0) {
    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    navLinks.forEach(link => {
                        const href = link.getAttribute("href");
                        link.classList.toggle("active", href === `#${activeId}`);
                    });
                }
            });
        },
        {
            rootMargin: "-20% 0px -65% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}


/* =====================================
   SCROLL REVEAL ANIMATIONS
===================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-text, " +
    ".info-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".certificate-card, " +
    ".creative-card, " +
    ".contact-message, " +
    ".contact-link, " +
    ".about-stat-card"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}
