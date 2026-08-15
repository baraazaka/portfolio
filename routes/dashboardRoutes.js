const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getDashboardStats
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", authenticateToken, getDashboardStats);

module.exports = router;