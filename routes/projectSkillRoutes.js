const express = require("express");

const {
    createProjectSkill,
    getProjectSkills
} = require("../controllers/projectSkillController");

const router = express.Router();
router.get("/",getProjectSkills);
router.post("/", createProjectSkill);

module.exports = router;