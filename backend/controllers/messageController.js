const pool = require("../db");


const getMessages = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT id, user_id, name, email, message, created_at
             FROM messages
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

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
        const userId = req.params.userId;

        const {
            name,
            email,
            message
        } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                error: "Name, email and message are required"
            });
        }

        const userResult = await pool.query(
            `SELECT id
             FROM users
             WHERE id = $1`,
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: "Portfolio owner not found"
            });
        }

        const result = await pool.query(
            `INSERT INTO messages
            (user_id, name, email, message)
            VALUES ($1, $2, $3, $4)
            RETURNING id, user_id, name, email, message, created_at`,
            [
                userId,
                name,
                email,
                message
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

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


module.exports = {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage
};