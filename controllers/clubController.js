const Club = require("../models/Club");
const User = require("../models/User");

function createClub(req, res) {
  const club = new Club({
    name: req.body.name,
    category: req.body.name,
    description: req.body.description,
    meetingDay: req.body.meetingDay,
    location: req.body.meetingDay,
  });

  club
    .save()
    .then(function (savedClub) {
      res.status(201).json({
        message: "Club created successfully",
        club: savedClub
      });
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to create club",
        error: error.message
      });  
    });
}

function getAllClubs(req, res) {
  Club.find()
    .populate("members", "name email")
    .then(function (clubs) {
      if (!club) {
         return res.status(404).json({ message: "Club not found" });
      }

      res.status(200).json(club);
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to get club",
        error: error.message
      });
    });
}

function updateClub(req, res) {
  Club.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      meetingDay: req.body.meetingDay,
      location: req.body.location  
    },
    { new: true }
  )
    .then(function (updateClub) {
      if (!updateClub) {
        return res.status(404).json({ message: "Club not found" });
      }
      
      res.status(200).json({ 
      message: "Club updated successfully",
      club: updateClub 
    });
  })
  .catch(function (error) {
    res.status(500).json({
      message: "Failed to update club",
      error: error.message  
     });
   });
}

function deleteClub(req, res) {
  Club.findByIdAndDelete(req.params.id)
    .then(function (deletedClub) {
      if (!deleteClub) {
        return res.status(404).json({ message: "Club not found" });
      }
      
      res.status(200).json({ message: "Club deleted successfully" });
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to delete club",
        error: error.message
      });  
    });  
}

function joinClub(req, res) {
  const clubId = req.params.id;
  const userId = req.body.userId;
  
  Club.findById(clubId)
    .then(function (club) {
      if (!deleteClub) {
        return res.status(404).json({ message: "Club not found" });
      }
      
      res.status(200).json({ message: "Club deleted successfully" });
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to delete club",
        error: error.message
      });  
    });
}

function joinClub(req, res) {
  const clubId = req.params.id;
  const userId = req.body.userId;
  
  Club.findById(clubId)
    .then(function (club) {
      if (!club) {
        return res.status(404).json({ message: "Club not found" });
      }
      
      if (!club.members.includes(userId)) {
        club.members.push(userId);
      }

      return club.save();
    })
    .then(function () {
      res.status(500).json({
        message: "Failed to join club",
        error: error.message
      });  
    });
}

function leaveClub(req, res) {
  const clubId = req.params.id;
  const userId = req.body.userId;

  Club.findByIdAndUpdate(clubId, {
    $pull: { members: userId }
  })
    .then(function () {
      return User.findByIdAndUpdate(userId, {
        $pull: { joinedClubs: clubId }
      });
    })
    .then(function () {
      res.status(200).json({  message: "Left club successfully" });
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Failed to leave club",
        error: error.message
      });
    });
}

module.exports = {
  createClub: createClub,
  getAllClubs: getAllClubs,
  getClubById: getClubById,
  updateClub: updateClub,
  deleteClub: deleteClub,
  joinClub: joinClub,
  leaveClub: leaveClub
};