const express = require("express");

const {
    getSkills,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill
} = require("../controllers/skillController");

const router = express.Router();

router.get("/", getSkills);
router.get("/:id",getSkillById);
router.post("/", createSkill);
router.put("/:id",updateSkill);
router.delete("/:id",deleteSkill);
module.exports = router;