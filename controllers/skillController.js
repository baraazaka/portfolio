const pool = require("../db");


const getSkills = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM skills ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch skills"
        });
    }
};


const createSkill = async (req, res) => {
    try {
        const {
            user_id,
            name,
            category,
            level
        } = req.body;

        const result = await pool.query(
            `INSERT INTO skills
            (user_id, name, category, level)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                user_id,
                name,
                category,
                level
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to create skill"
        });
    }
};


module.exports = {
    getSkills,
    createSkill
};