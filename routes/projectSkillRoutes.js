const express = require("express");
const {
    createProjectSkill,
    getSkillsByProject,
    getAllProjectSkills,
    deleteProjectSkill,
    getProjectsBySkill
} = require("../controllers/projectSkillController");

const router = express.Router();

router.get("/", getAllProjectSkills);

router.get("/project/:id/skills", getSkillsByProject);

router.get("/skill/:id/projects", getProjectsBySkill);

router.post("/", createProjectSkill);

router.delete("/:projectId/:skillId", deleteProjectSkill);

module.exports = router;