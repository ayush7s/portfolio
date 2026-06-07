// ===== Smooth Scroll =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        const targetId = this.getAttribute('href');

        if(targetId === "#") return;

        e.preventDefault();

        const target =
        document.querySelector(targetId);

        if(target){

            target.scrollIntoView({
                behavior: 'smooth'
            });

        }

    });

});
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = toggleBtn.querySelector("i");

    if(document.body.classList.contains("light-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }

});

// ===== Active Navbar Highlight =====
const sections =
document.querySelectorAll("header[id], section[id]");

const navLinks =
document.querySelectorAll(".nav-pill a, .mobile-nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 250;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
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

document.querySelectorAll(
".project-showcase, .section h2, .skill-card"
).forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});
// ===== Typing Effect =====

const typingElement =
document.querySelector(".typing-text");

const words = [
    "AI & Software Developer",
    "Machine Learning Enthusiast",
    "Building Real-World AI Products"
];

let wordIndex = 0;
let charIndex = 0;

function type(){
    if(!typingElement) return;

    if(charIndex < words[wordIndex].length){

        typingElement.textContent +=
        words[wordIndex].charAt(charIndex);

        charIndex++;

        setTimeout(type, 70);

    }else{

        setTimeout(erase, 1500);

    }

}

function erase(){

    if(charIndex > 0){

        typingElement.textContent =
        words[wordIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(erase, 40);

    }else{

        wordIndex++;

        if(wordIndex >= words.length){
            wordIndex = 0;
        }

        setTimeout(type, 400);

    }

}

window.addEventListener("load", type);
if(window.innerWidth > 768){

document.addEventListener("mousemove", (e) => { 

    const x = e.clientX;
    const y = e.clientY;

    document.documentElement.style.setProperty(
        "--mouse-x",
        `${x}px`
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        `${y}px`
    );

});
}
// =====================================
// PROJECT SLIDER
// =====================================

const slides =
document.querySelectorAll(".project-showcase");

const dotsContainer =
document.querySelector(".slider-dots");
if(dotsContainer){

    slides.forEach((_, index) => {

        const dot = document.createElement("div");

        dot.classList.add("slider-dot");

        if(index === 0){
            dot.classList.add("active");
        }

        dotsContainer.appendChild(dot);

        dot.addEventListener("click", () => {
            showSlide(index);
        });

    });

}
let currentSlide = 0;

// CREATE DOTS



// SHOW SLIDE

function showSlide(index){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    document
    .querySelectorAll(".slider-dot")
    .forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    document
    .querySelectorAll(".slider-dot")[index]
    .classList.add("active");

    currentSlide = index;
    resetProgressAnimation();

}

// FIRST SLIDE

showSlide(0);

// AUTO CHANGE EVERY 5 SEC

setInterval(() => {

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 5000);
// RESET ANIMATION WHEN CHANGING

function resetProgressAnimation(){

    const activeDot =
    document.querySelector(".slider-dot.active");

    if(activeDot){

        activeDot.style.animation = "none";

        void activeDot.offsetWidth;

        activeDot.style.animation = "";

    }

}
window.addEventListener("scroll", () => {

    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 20
    ) {

        navLinks.forEach(link =>
            link.classList.remove("active")
        );

        document
            .querySelector('a[href="#contact"]')
            ?.classList.add("active");

        return;
    }

});
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".case-studies-container");
    const cards = document.querySelectorAll(".case-study-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dotsContainer = document.querySelector(".cs-slider-dots");

    if (!container || cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;

    // 1. Generate Navigation Tracking Dots Dynamically
    cards.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("cs-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".cs-dot");

    // 2. Main Slide Transform Engine
    function goToSlide(index) {
        // Enforce boundary guardrails
        if (index < 0) index = 0;
        if (index >= totalCards) index = totalCards - 1;

        currentIndex = index;
        
        // Push container horizontally based on card index
        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active indicator state arrays
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });

        // Toggle disabled styling triggers for extreme bounds
        prevBtn.style.opacity = currentIndex === 0 ? "0.4" : "1";
        prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
        nextBtn.style.opacity = currentIndex === totalCards - 1 ? "0.4" : "1";
        nextBtn.style.pointerEvents = currentIndex === totalCards - 1 ? "none" : "auto";
    }

    // 3. Desktop Arrow Interactive Click Events
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

    // 4. Mobile Hardware Touch Gesture Integrations (Swipe Support)
    let startX = 0;
    let endX = 0;
    const swipeThreshold = 50; // Minimum sliding travel distance in pixels to trigger slide

    container.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
        const difference = startX - endX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swiped Left -> Move to Next card
                goToSlide(currentIndex + 1);
            } else {
                // Swiped Right -> Move to Previous card
                goToSlide(currentIndex - 1);
            }
        }
    }

    // Initialize display state configurations
    goToSlide(0);
});