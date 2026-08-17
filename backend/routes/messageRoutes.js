const express = require("express");

const {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage
} = require("../controllers/messageController");

const router = express.Router();

router.get("/", getMessages);
router.get("/:id", getMessageById);
router.post("/",createMessage);
router.delete("/:id",deleteMessage);

module.exports = router;