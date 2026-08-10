const express = require("express");

const {
    getMessages,
    getMessageById
} = require("../controllers/messageController");

const router = express.Router();

router.get("/", getMessages);
router.get("/:id", getMessageById);

module.exports = router;