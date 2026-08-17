const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getProjects,
    getMyProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const router = express.Router();

// Public - all projects
router.get("/", getProjects);

// Protected - current user's projects
router.get("/my", authenticateToken, getMyProjects);

// Public - single project
router.get("/:id", getProjectById);

// Protected - create
router.post("/", authenticateToken, createProject);

// Protected - update
router.put("/:id", authenticateToken, updateProject);

// Protected - delete
router.delete("/:id", authenticateToken, deleteProject);

module.exports = router;