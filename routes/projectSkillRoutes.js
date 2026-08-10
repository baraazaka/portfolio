const express = require("express");

const {
    createProjectSkill,
    getSkillsByProject,
    getAllProjectSkills,
    deleteProjectSkill
} = require("../controllers/projectSkillController");
const router = express.Router();

router.get("/", getAllProjectSkills);

router.get("/project/:id/skills", getSkillsByProject);

router.post("/", createProjectSkill);

router.delete("/:projectId/:skillId", deleteProjectSkill);

module.exports = router;