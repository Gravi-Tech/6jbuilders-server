const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const BookingController = require("../controllers/booking.controller");

router.post("/bookings", BookingController.createBooking);
router.get("/bookings",  Authorization.authorized, BookingController.getBookings);
router.get("/bookings/:id", Authorization.authorized, BookingController.getBookingById);
router.put("/bookings/:id", Authorization.authorized, BookingController.updateBooking);
router.delete("/bookings/:id", Authorization.authorized, BookingController.deleteBooking);

module.exports = router;