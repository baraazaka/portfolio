const pool = require("../db");


const getMessages = async (req, res) => {
    try {
        const user_id = req.user.userId;

        const result = await pool.query(
            `SELECT
                m.id,
                m.name,
                m.email,
                m.message,
                m.project_id,
                m.receiver_id,
                m.created_at,
                p.title AS project_title
             FROM messages m
             LEFT JOIN projects p
                ON p.id = m.project_id
             WHERE m.receiver_id = $1
             ORDER BY m.created_at DESC`,
            [user_id]
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Get messages error:", error);

        res.status(500).json({
            error: "Failed to fetch messages"
        });
    }
};

const getMessageById = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT id, user_id, name, email, message, created_at
             FROM messages
             WHERE id = $1
               AND user_id = $2`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Message not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch message"
        });
    }
};


const createMessage = async (req, res) => {
    try {
        const {
            name,
            email,
            message,
            project_id
        } = req.body;

        if (!name || !email || !message || !project_id) {
            return res.status(400).json({
                error: "Name, email, message and project are required"
            });
        }

        // Get project owner
        const projectResult = await pool.query(
            `SELECT user_id
             FROM projects
             WHERE id = $1`,
            [project_id]
        );

        if (projectResult.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        const receiver_id = projectResult.rows[0].user_id;

        const result = await pool.query(
            `INSERT INTO messages
            (
                name,
                email,
                message,
                project_id,
                receiver_id
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                id,
                name,
                email,
                message,
                project_id,
                receiver_id,
                created_at`,
            [
                name,
                email,
                message,
                project_id,
                receiver_id
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Create message error:", error);

        res.status(500).json({
            error: "Failed to create message"
        });
    }
};
const deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `DELETE FROM messages
             WHERE id = $1
             RETURNING id, name, email, message`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Message not found"
            });
        }

        res.json({
            message: "Message deleted successfully",
            deletedMessage: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete message"
        });
    }
};

const getUnreadMessagesCount = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT COUNT(*)
             FROM messages
             WHERE receiver_id = $1
             AND is_read = FALSE`,
            [userId]
        );

        res.json({
            count: Number(result.rows[0].count)
        });

    } catch (error) {
        console.error(
            "Unread messages count error:",
            error
        );

        res.status(500).json({
            error: "Failed to get unread messages count"
        });
    }
};
const getUnreadMessages = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT
                m.id,
                m.name,
                m.email,
                m.message,
                m.project_id,
                m.created_at,
                p.title AS project_title
             FROM messages m
             LEFT JOIN projects p
                ON p.id = m.project_id
             WHERE m.receiver_id = $1
             AND m.is_read = FALSE
             ORDER BY m.created_at DESC
             LIMIT 10`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(
            "Unread messages error:",
            error
        );

        res.status(500).json({
            error: "Failed to fetch unread messages"
        });
    }
};
const markMessageAsRead = async (req, res) => {
    try {
        const userId = req.user.userId;
        const messageId = req.params.id;

        const result = await pool.query(
            `UPDATE messages
             SET is_read = TRUE
             WHERE id = $1
             AND receiver_id = $2
             RETURNING id, is_read`,
            [messageId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Message not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(
            "Mark message as read error:",
            error
        );

        res.status(500).json({
            error: "Failed to mark message as read"
        });
    }
};
module.exports = {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage,
    getUnreadMessagesCount,
    getUnreadMessages,
    markMessageAsRead
};