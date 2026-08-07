// =============================
// Spice House JavaScript
// =============================

// Active Navigation
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// Sticky Header Shadow
window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
    }
});

// Contact Form
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;

        if (name === "" || email === "") {
            alert("Please fill all required fields.");
            return;
        }

        alert("Thank you for contacting Spice House!");

        form.reset();

    });
}

// Fade Animation
const cards = document.querySelectorAll(".highlight-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});