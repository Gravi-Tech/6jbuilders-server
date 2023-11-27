const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const BookingController = require("../controllers/booking.controller");

router.post("/bookings", BookingController.createBooking);
router.get("/bookings",  Authorization.authorized, BookingController.getBookings);
router.get("/bookings/:id", Authorization.authorized, BookingController.getBookingById);
router.put("/bookings/:id", Authorization.authorized, BookingController.updateBooking);
router.get("/bookings/:id/status", Authorization.authorized, BookingController.checkBookingStatus);
router.put("/bookings/:id/reject", Authorization.authorized, BookingController.rejectBooking);
router.delete("/bookings/:id", Authorization.authorized, BookingController.deleteBooking);

module.exports = router;