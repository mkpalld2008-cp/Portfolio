const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const typingText = document.getElementById("typingText");
const statusText = document.getElementById("statusText");
const codeQuote = document.getElementById("codeQuote");
const cursorGlow = document.querySelector(".cursor-glow");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

const revealElements = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-bar");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            if (entry.target.classList.contains("skill-card")) {
                const bar = entry.target.querySelector(".progress-bar");
                if (bar && !bar.dataset.animated) {
                    bar.style.width = bar.dataset.width + "%";
                    bar.dataset.animated = "true";
                }
            }
        }
    });
}, {
    threshold: 0.18
});

revealElements.forEach(el => observer.observe(el));
document.querySelectorAll(".skill-card").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a");

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.remove("active");
        if (anchor.getAttribute("href") === `#${current}`) {
            anchor.classList.add("active");
        }
    });
});

const lines = [
    "Welcome, visitor. Portfolio ready.",
    "Launching project interface... success.",
    "Python systems stable. Web modules active.",
    "Curiosity detected. Explore freely."
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentLine = lines[lineIndex];

    if (!deleting) {
        typingText.textContent = currentLine.slice(0, charIndex++);
        if (charIndex > currentLine.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        typingText.textContent = currentLine.slice(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            lineIndex = (lineIndex + 1) % lines.length;
        }
    }

    setTimeout(typeEffect, deleting ? 32 : 58);
}

typeEffect();

const statusMessages = ["SYSTEM ONLINE", "READY TO BUILD", "PROJECTS ACTIVE"];
let statusIndex = 0;

setInterval(() => {
    statusIndex = (statusIndex + 1) % statusMessages.length;
    statusText.textContent = statusMessages[statusIndex];
}, 2200);

const codeQuotes = [
    'print("Hello, world. This is Chetan.")',
    'while(learning){ build(); improve(); }',
    'const future = "built with curiosity";',
    'if (idea) { create(idea); }'
];

let quoteIndex = 0;
codeQuote.textContent = codeQuotes[0];

setInterval(() => {
    quoteIndex = (quoteIndex + 1) % codeQuotes.length;
    codeQuote.textContent = codeQuotes[quoteIndex];
}, 2500);

window.addEventListener("mousemove", (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }
});