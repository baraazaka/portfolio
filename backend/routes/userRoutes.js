const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const uploadProfileImage = require("../middleware/uploadMiddleware");

const {
    getUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
    createUser,
    updateUser,
    deleteUser,
    getPublicPortfolio,
    publishPortfolio,
    getPublishedPortfolios,
    getFeaturedPortfolios,
    unpublishPortfolio
} = require("../controllers/userController");

const router = express.Router();


// =========================
// Public
// =========================

router.get(
    "/",
    getUsers
);


// Public Portfolio
router.get(
    "/portfolio/:username",
    getPublicPortfolio
);


// All Published Portfolios
router.get(
    "/portfolios",
    getPublishedPortfolios
);


// Featured / Latest 3 Portfolios
router.get(
    "/featured",
    getFeaturedPortfolios
);


// =========================
// Authenticated User
// =========================

// Get my profile
router.get(
    "/me",
    authenticateToken,
    getMyProfile
);


// Update my profile
router.put(
    "/me",
    authenticateToken,
    uploadProfileImage.single("profile_image"),
    updateMyProfile
);


// =========================
// Portfolio
// =========================

router.put(
    "/:id/portfolio",
    authenticateToken,
    publishPortfolio
);

// =========================
// Portfolio
// =========================


router.put(
    "/:id/portfolio/unpublish",
    authenticateToken,
    unpublishPortfolio
);
// =========================
// User By ID
// =========================

router.get(
    "/:id",
    getUserById
);


router.put(
    "/:id",
    authenticateToken,
    updateUser
);


router.delete(
    "/:id",
    authenticateToken,
    deleteUser
);


module.exports = router;