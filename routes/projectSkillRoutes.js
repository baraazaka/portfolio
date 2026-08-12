const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    createProjectSkill,
    getSkillsByProject,
    getAllProjectSkills,
    deleteProjectSkill,
    getProjectsBySkill
} = require("../controllers/projectSkillController");

const router = express.Router();


router.get("/", getAllProjectSkills);

router.get("/project/:id/skills",getSkillsByProject);

router.get("/skill/:id/projects",getProjectsBySkill);


router.post("/",authenticateToken,createProjectSkill);

router.delete("/:projectId/:skillId", authenticateToken,deleteProjectSkill);


module.exports = router;