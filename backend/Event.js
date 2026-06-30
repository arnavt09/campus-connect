const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true  
    },
    eventDate: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        require: true
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }  
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);