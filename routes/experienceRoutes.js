const express = require("express");

const {
    getExperiences,
    getExperienceById,
    createExperience
} = require("../controllers/experienceController");

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);
router.post("/",createExperience);

module.exports = router;