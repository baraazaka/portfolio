const pool = require("../db");

const getMessages = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, message, created_at
             FROM messages
             ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch messages"
        });
    }
};


const getMessageById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT id, name, email, message, created_at
             FROM messages
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Message not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

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
            message
        } = req.body;

        const result = await pool.query(
            `INSERT INTO messages
            (name, email, message)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, message, created_at`,
            [
                name,
                email,
                message
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

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
        console.log(error);

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