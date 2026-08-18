const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage,
    getUnreadMessagesCount,
    getUnreadMessages,
    markMessageAsRead
} = require("../controllers/messageController");

const router = express.Router();


// Send message
router.post("/", createMessage);


// All messages
router.get(
    "/",
    authenticateToken,
    getMessages
);


// Unread messages
router.get(
    "/unread",
    authenticateToken,
    getUnreadMessages
);

router.get(
    "/unread-count",
    authenticateToken,
    getUnreadMessagesCount
);

router.patch(
    "/:id/read",
    authenticateToken,
    markMessageAsRead
);

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