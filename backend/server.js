require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// =============================
// MongoDB Connection
// =============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((error) => {
        console.log("❌ MongoDB Connection Error:", error);
    });


// =============================
// Reservation Schema
// =============================

const reservationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        date: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        guests: {
            type: Number,
            required: true
        },

        message: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Reservation = mongoose.model(
    "Reservation",
    reservationSchema
);


// =============================
// Contact Schema
// =============================

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String
        },

        subject: {
            type: String
        },

        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Contact = mongoose.model(
    "Contact",
    contactSchema
);


// =============================
// Test Route
// =============================

app.get("/", (req, res) => {
    res.send("Restaurant Backend is Running 🚀");
});


// =============================
// CREATE RESERVATION
// =============================

app.post("/api/reservations", async (req, res) => {

    try {

        const reservation =
            new Reservation(req.body);

        await reservation.save();

        res.status(201).json({
            success: true,
            message: "Table reserved successfully!",
            reservation
        });

    } catch (error) {

        console.error(
            "Reservation Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to reserve table",
            error: error.message
        });

    }

});


// =============================
// GET RESERVATIONS
// =============================

app.get("/api/reservations", async (req, res) => {

    try {

        const reservations =
            await Reservation.find()
                .sort({ createdAt: -1 });

        res.json({
            success: true,
            reservations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to get reservations",
            error: error.message
        });

    }

});


// =============================
// CREATE CONTACT MESSAGE
// =============================

app.post("/api/contact", async (req, res) => {

    try {

        const contact =
            new Contact(req.body);

        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully!",
            contact
        });

    } catch (error) {

        console.error(
            "Contact Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message
        });

    }

});


// =============================
// GET CONTACT MESSAGES
// =============================

app.get("/api/contact", async (req, res) => {

    try {

        const messages =
            await Contact.find()
                .sort({ createdAt: -1 });

        res.json({
            success: true,
            messages
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to get messages",
            error: error.message
        });

    }

});


// =============================
// START SERVER
// =============================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});
