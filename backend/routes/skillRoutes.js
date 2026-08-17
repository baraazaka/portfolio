const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getSkills,
    getMySkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
} = require("../controllers/skillController");
const router = express.Router();
console.log("SKILL ROUTES LOADED");
router.get("/my", authenticateToken, getMySkills);

router.get("/", getSkills);
router.get("/:id", getSkillById);


router.post("/", authenticateToken, createSkill);
router.put("/:id", authenticateToken, updateSkill);
router.delete("/:id", authenticateToken, deleteSkill);


module.exports = router;