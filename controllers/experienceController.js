const pool = require("../db");

const getExperiences = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM experiences
             ORDER BY start_date DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch experiences"
        });
    }
};


const getExperienceById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT *
             FROM experiences
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Experience not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch experience"
        });
    }
};


module.exports = {
    getExperiences,
    getExperienceById
};