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
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-pill a, .mobile-nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        const sectionHeight =
        section.offsetHeight;

        if(
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            .includes(current)
        ){

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
".project-showcase, .section h2, .skill"
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

let currentSlide = 0;

// CREATE DOTS

slides.forEach((_, index) => {

    const dot =
    document.createElement("div");

    dot.classList.add("slider-dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});

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