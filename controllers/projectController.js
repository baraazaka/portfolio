const pool = require("../db");

const getProjects = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM projects ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch projects"
        });
    }
};


const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM projects WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch project"
        });
    }
};


const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            image_url,
            github_url,
            live_url
        } = req.body;

        const user_id = req.user.userId;

        const result = await pool.query(
            `INSERT INTO projects
            (user_id, title, description, image_url, github_url, live_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                user_id,
                title,
                description,
                image_url,
                github_url,
                live_url
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to create project"
        });
    }
};


const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        const {
            title,
            description,
            image_url,
            github_url,
            live_url
        } = req.body;

        const result = await pool.query(
            `UPDATE projects
             SET title = $1,
                 description = $2,
                 image_url = $3,
                 github_url = $4,
                 live_url = $5,
                 updated_at = NOW()
             WHERE id = $6 AND user_id = $7
             RETURNING *`,
            [
                title,
                description,
                image_url,
                github_url,
                live_url,
                id,
                user_id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found or you are not allowed to update it"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to update project"
        });
    }
};


const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        const result = await pool.query(
            `DELETE FROM projects
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found or you are not allowed to delete it"
            });
        }

        res.json({
            message: "Project deleted successfully",
            project: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete project"
        });
    }
};


module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};