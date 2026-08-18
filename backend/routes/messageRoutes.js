const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage
} = require("../controllers/messageController");

const router = express.Router();


router.post("/", createMessage);


router.get("/", authenticateToken, getMessages);

router.get(
    "/:id",
    authenticateToken,
    getMessageById
);

router.delete(
    "/:id",
    authenticateToken,
    deleteMessage
);


module.exports = router;