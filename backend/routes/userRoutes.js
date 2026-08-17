const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();


router.get("/", getUsers);
router.get("/:id", getUserById);


router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);


module.exports = router;