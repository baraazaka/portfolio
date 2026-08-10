const express = require("express");

const {
    createProjectSkill,
    getSkillsByProject,
    getAllProjectSkills
} = require("../controllers/projectSkillController");

const router = express.Router();

router.get("/", getAllProjectSkills);

router.get("/project/:id/skills", getSkillsByProject);

router.post("/", createProjectSkill);

module.exports = router;