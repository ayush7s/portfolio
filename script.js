// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({
                behavior: 'smooth'
            });
    });
});


// ===== Active Navbar Highlight =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});


// ===== Scroll Reveal Animation =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".card, .section h2, .skill").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// ===== Parallax Effect (Hero Section) =====
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    let offset = window.scrollY;
    hero.style.transform = `translateY(${offset * 0.2}px)`;
});


// ===== Typewriter Effect =====
const text = "AI & Software Developer";
let index = 0;
const speed = 70;

function typeEffect() {
    const element = document.querySelector(".hero p");
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, speed);
    }
}

// Clear existing text and start typing
window.addEventListener("load", () => {
    const element = document.querySelector(".hero p");
    element.textContent = "";
    typeEffect();
});