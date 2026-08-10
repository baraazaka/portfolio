const pool = require("../db");

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "SELECT id, name, email, created_at FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch user"
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const result = await pool.query(
            `INSERT INTO users
            (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, created_at`,
            [name, email, password]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to create user"
        });
    }
};


module.exports = {
    getUsers,
    getUserById,
    createUser
};