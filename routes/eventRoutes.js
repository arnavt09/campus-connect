const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.deleteEvent);

router.post("/:id/rsvp", eventController.rsvpEvent);
router.post("/:id/cancel-rsvp", eventController.cancelRsvp);

module.exports = router;