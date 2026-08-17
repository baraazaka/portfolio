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


const getSkillById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM skills WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Skill not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch skill"
        });
    }
};
const getMySkills = async (req, res) => {
    try {
        const user_id = req.user.userId;

        const result = await pool.query(
            `SELECT *
             FROM skills
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [user_id]
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch your skills"
        });
    }
};

const createSkill = async (req, res) => {
    try {
        const {
            name,
            category,
            level
        } = req.body;

        const user_id = req.user.userId;

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


const updateSkill = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        const {
            name,
            category,
            level
        } = req.body;

        const result = await pool.query(
            `UPDATE skills
             SET name = $1,
                 category = $2,
                 level = $3
             WHERE id = $4 AND user_id = $5
             RETURNING *`,
            [
                name,
                category,
                level,
                id,
                user_id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Skill not found or you are not allowed to update it"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to update skill"
        });
    }
};


const deleteSkill = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        const result = await pool.query(
            `DELETE FROM skills
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Skill not found or you are not allowed to delete it"
            });
        }

        res.json({
            message: "Skill deleted successfully",
            skill: result.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to delete skill"
        });
    }
};


module.exports = {
    getSkills,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill,
    getMySkills
};