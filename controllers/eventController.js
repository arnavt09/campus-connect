const Event = require("../models/Event");
const User = require("../models/User");

function createEvent(req, res) {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      location: req.body.location,
      club: req.body.club  
    });

    event
      .save()
      .then(function (savedEvent) {
        res.status(201).json({
          message: "Event created successfully",
          event: savedEvent
        });
      })
      .catch(function (error) {
        res.status(500).json({
          message: "Failed to create event",
          error: error.message
        });
      });
}

function getAllEvents(req, res) {
  Event.findById(req.params.id)
    .populate("club", "name category")
    .populate("attendees", "name email")
    .then(function (event) {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json(events);
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to get events",
        error: error.message
      });  
    });  
}

function updateEvent(req, res) {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      location: req.body.location,
      club: req.body.club  
    },
    { new: true }
  )
    .then(function (updateEvent) {
      if (!updateEvent) {
        return res.status(404).json({ message: "Event not found" }); 
      }
      
      if (!event.attendees.includes(userId)) {
        event.attendees.push(userId);
      }

      return event.save();
    })
    .then(function () {
      res.status(200).json({ message: "RSVP successful" });  
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to RSVP",
        error: error.message
      });
    });  
}

function cancelRsvp(req, res) {
  Event.findById(req.params.id)
    .then(function (event) {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      event.attendees = event.attendees.filter(function (attendee) {
        return attendee.toString() !== req.body.userId;
      });

      return event.save();
    })
    .then(function () {
      res.status(200).json({ message: "RSVP cancelled successfully" });
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to cancel RSVP",
        error: error.message
      });
    });
}

module.exports = {
  createEvent: createEvent,
  getAllEvents: getAllEvents,
  getEventById: getEventById,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  rsvpEvent: rsvpEvent,
  cancelRsvp: cancelRsvp
};