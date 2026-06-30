const express = require("express");
const router = express.Router();

const clubController = require("../controllers/clubController");

router.post("/", clubController.createClub);
router.post("/", clubController.getAllClubs);
router.post("/:id", clubController.getClubById);
router.get("/:id", clubController.updateClub);
router.delete("/:id", clubController.deleteClub);

router.post("/:id/join", clubController.joinClub);
router.post("/:id/leave", clubController.leaveClub);

module.exports = router;