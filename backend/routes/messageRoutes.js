const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage
} = require("../controllers/messageController");

const router = express.Router();


// Send message
router.post("/", createMessage);


// Dashboard messages
router.get(
    "/",
    authenticateToken,
    getMessages
);


// Get one message
router.get(
    "/:id",
    authenticateToken,
    getMessageById
);


// Delete message
router.delete(
    "/:id",
    authenticateToken,
    deleteMessage
);


module.exports = router;