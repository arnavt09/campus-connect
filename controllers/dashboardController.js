const User = require("../models/User");

function getDashboard(req, res) {
  const userId = req.params.userId;

  User.findById(userId)
    .select("-password")
    .populate("joinedClubs")
    .populate({
      path: "rsvpedEvents",
      populate: {
        path: "club",
        select: "name category"
      }  
    })
    .then(function (user) {
      if (!user) {
        return res.status(404).json
      }
      
      res.status(200).json({
        user: user,
        joinedClubs: user.joinedClubs,
        rsvpedEvents: user.rsvpedEvents
      });
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to get dashboard",
        error: error.message
      });
    });
}

module.exports = {
  getDashboard: getDashboard  
};