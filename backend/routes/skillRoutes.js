const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getSkills,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill
} = require("../controllers/skillController");

const router = express.Router();


router.get("/", getSkills);
router.get("/:id", getSkillById);


router.post("/", authenticateToken, createSkill);
router.put("/:id", authenticateToken, updateSkill);
router.delete("/:id", authenticateToken, deleteSkill);


module.exports = router;