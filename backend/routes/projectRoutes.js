const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getProjects,
    getMyProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    toggleProjectPublish,
    getFeaturedProjects
} = require("../controllers/projectController");

const router = express.Router();


// My projects
router.get(
    "/my",
    authenticateToken,
    getMyProjects
);


// Featured projects
router.get(
    "/featured",
    getFeaturedProjects
);


// All published projects
router.get(
    "/",
    getProjects
);


// Publish / Unpublish
router.patch(
    "/:id/publish",
    authenticateToken,
    toggleProjectPublish
);


// Get project by ID
router.get(
    "/:id",
    getProjectById
);


// Create project
router.post(
    "/",
    authenticateToken,
    createProject
);


// Update project
router.put(
    "/:id",
    authenticateToken,
    updateProject
);


// Delete project
router.delete(
    "/:id",
    authenticateToken,
    deleteProject
);


module.exports = router;