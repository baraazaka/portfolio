const pool = require("../db");

const getProjectSkills = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                ps.project_id,
                p.title AS project_title,
                ps.skill_id,
                s.name AS skill_name
            FROM project_skills ps
            INNER JOIN projects p
                ON ps.project_id = p.id
            INNER JOIN skills s
                ON ps.skill_id = s.id
            ORDER BY ps.project_id`
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch project skills"
        });
    }
};

const createProjectSkill = async (req, res) => {
    try {
        const { project_id, skill_id } = req.body;

        const result = await pool.query(
            `INSERT INTO project_skills
            (project_id, skill_id)
            VALUES ($1, $2)
            RETURNING *`,
            [project_id, skill_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to create project skill"
        });
    }
};

module.exports = {
    getProjectSkills,
    createProjectSkill
};