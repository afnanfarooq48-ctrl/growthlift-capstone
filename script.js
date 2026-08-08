js
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

    if (!header) return;

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
    }
});

js
// =============================
// Contact Form
// =============================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const contactData = {

                name:
                    document.getElementById(
                        "contactName"
                    ).value,

                email:
                    document.getElementById(
                        "contactEmail"
                    ).value,

                phone:
                    document.getElementById(
                        "contactPhone"
                    ).value,

                subject:
                    document.getElementById(
                        "contactSubject"
                    ).value,

                message:
                    document.getElementById(
                        "contactMessage"
                    ).value

            };


            try {

                const response =
                    await fetch(
                        "https://spice-house-backend.onrender.com/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    contactData
                                )
                        }
                    );


                const data =
                    await response.json();


                if (
                    response.ok &&
                    data.success
                ) {

                    alert(
                        "✅ Message sent successfully!"
                    );

                    contactForm.reset();

                } else {

                    alert(
                        "❌ Message could not be sent."
                    );

                    console.log(data);

                }


            } catch (error) {

                console.error(
                    "Contact Error:",
                    error
                );

                alert(
                    "❌ Cannot connect to server."
                );

            }

        }
    );

}

// =============================
// Reservation Form
// =============================

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {

    reservationForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("reservationName").value;
        const email = document.getElementById("reservationEmail").value;
        const phone = document.getElementById("reservationPhone").value;
        const date = document.getElementById("reservationDate").value;
        const time = document.getElementById("reservationTime").value;
        const guests = document.getElementById("reservationGuests").value;
        const message = document.getElementById("reservationMessage").value;

        const reservationData = {
            name,
            email,
            phone,
            date,
            time,
            guests: Number(guests),
            message
        };

        try {

            const response = await fetch(
                "https://spice-house-backend.onrender.com/api/reservations",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(reservationData)
                }
            );

            const data = await response.json();

            if (data.success) {

                alert("✅ Table reserved successfully!");

                reservationForm.reset();

            } else {

                alert("❌ Reservation failed. Please try again.");

            }

        } catch (error) {

            console.error("Reservation Error:", error);

            alert(
                "❌ Cannot connect to server. Make sure the backend is running."
            );

        }

    });
}

// =============================
// Fade Animation
// =============================

const cards = document.querySelectorAll(".highlight-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });

});
