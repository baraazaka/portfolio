const express = require("express");

const {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience
} = require("../controllers/experienceController");

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);
router.post("/",createExperience);
router.update("/:id",updateExperience);

module.exports = router;