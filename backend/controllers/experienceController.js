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
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch experiences"
        });
    }
};


const getMyExperiences = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT *
             FROM experiences
             WHERE user_id = $1
             ORDER BY start_date DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch your experiences"
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
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch experience"
        });
    }
};


const createExperience = async (req, res) => {
    try {
        const {
            company,
            position,
            description,
            start_date,
            end_date
        } = req.body;

        const userId = req.user.userId;

        const result = await pool.query(
            `INSERT INTO experiences
            (
                user_id,
                company,
                position,
                description,
                start_date,
                end_date
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                userId,
                company,
                position,
                description,
                start_date,
                end_date
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create experience"
        });
    }
};


const updateExperience = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        const {
            company,
            position,
            description,
            start_date,
            end_date
        } = req.body;

        const result = await pool.query(
            `UPDATE experiences
             SET company = $1,
                 position = $2,
                 description = $3,
                 start_date = $4,
                 end_date = $5,
                 updated_at = NOW()
             WHERE id = $6
               AND user_id = $7
             RETURNING *`,
            [
                company,
                position,
                description,
                start_date,
                end_date,
                id,
                userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Experience not found or you are not allowed to update it"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update experience"
        });
    }
};


const deleteExperience = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        const result = await pool.query(
            `DELETE FROM experiences
             WHERE id = $1
               AND user_id = $2
             RETURNING *`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Experience not found or you are not allowed to delete it"
            });
        }

        res.json({
            message: "Experience deleted successfully",
            experience: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete experience"
        });
    }
};


module.exports = {
    getExperiences,
    getMyExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
};