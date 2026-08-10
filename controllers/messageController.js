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


module.exports = {
    getMessages,
    getMessageById
};