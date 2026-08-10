const pool = require("../db");


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


const getSkillsByProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        const result = await pool.query(
            `SELECT
                s.id,
                s.name,
                s.category,
                s.level
             FROM project_skills ps
             INNER JOIN skills s
                ON ps.skill_id = s.id
             WHERE ps.project_id = $1`,
            [projectId]
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch project skills"
        });
    }
};

const getAllProjectSkills = async (req, res) => {
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
const deleteProjectSkill = async (req, res) => {
    try {
        const { projectId, skillId } = req.params;

        const result = await pool.query(
            `DELETE FROM project_skills
             WHERE project_id = $1
             AND skill_id = $2
             RETURNING *`,
            [projectId, skillId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project skill relationship not found"
            });
        }

        res.json({
            message: "Project skill relationship deleted successfully",
            projectSkill: result.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to delete project skill relationship"
        });
    }
};
module.exports = {
    createProjectSkill,
    getSkillsByProject,
    getAllProjectSkills,
    deleteProjectSkill
};