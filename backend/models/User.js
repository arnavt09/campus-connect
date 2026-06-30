const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    role: {
      type: String,
      default: "student"
    },
    joinedClubs: [
      {
        type: mongoose.SchemaType.ObjectId,
        ref: "Club"
      }
    ],
    rsvpedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }
    ]
  },
  { timestamps: true }  
);

module.exports = mongoose.model("User", userSchema);