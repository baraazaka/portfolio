const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
} = require("../controllers/experienceController");

const router = express.Router();


router.get("/", getExperiences);
router.get("/:id", getExperienceById);


router.post("/", authenticateToken, createExperience);
router.put("/:id", authenticateToken, updateExperience);
router.delete("/:id", authenticateToken, deleteExperience);


module.exports = router;