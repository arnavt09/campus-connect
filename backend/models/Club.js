const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    meetingDay: {
      type: String  
    },
    location: {
      type: String
    },
    members: [
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

module.exports = mongoose.model("Club", clubSchema);