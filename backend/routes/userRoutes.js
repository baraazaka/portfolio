const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getPublicPortfolio,
    publishPortfolio
} = require("../controllers/userController");
const router = express.Router();


router.get("/", getUsers);
router.get(
    "/portfolio/:username",
    getPublicPortfolio
);
router.put(
    "/:id/portfolio",
    authenticateToken,
    publishPortfolio
);
router.get("/:id", getUserById);


router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);


module.exports = router;