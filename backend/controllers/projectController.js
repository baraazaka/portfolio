const pool = require("../db");


const getProjects = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM projects
             WHERE is_published = true
             ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch published projects"
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


const getMyProjects = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT *
             FROM projects
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch your projects"
        });
    }
};
const createProject = async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            title,
            description,
            image_url,
            github_url,
            live_url,
            skills = []
        } = req.body;

        const user_id = req.user.userId;

        await client.query("BEGIN");


        const projectResult = await client.query(
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

        const project = projectResult.rows[0];


        if (skills.length > 0) {

            const skillResult = await client.query(
                `SELECT id
                 FROM skills
                 WHERE id = ANY($1::int[])
                 AND user_id = $2`,
                [skills, user_id]
            );

            if (skillResult.rows.length !== skills.length) {
                await client.query("ROLLBACK");

                return res.status(400).json({
                    error: "One or more selected skills are invalid"
                });
            }


            // Add project-skills relationships
            for (const skillId of skills) {
                await client.query(
                    `INSERT INTO project_skills
                    (project_id, skill_id)
                    VALUES ($1, $2)`,
                    [project.id, skillId]
                );
            }
        }


        await client.query("COMMIT");


        res.status(201).json({
            ...project,
            skills
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(error);

        res.status(500).json({
            error: "Failed to create project"
        });

    } finally {
        client.release();
    }
};


const updateProject = async (req, res) => {
    const client = await pool.connect();

    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        const {
            title,
            description,
            image_url,
            github_url,
            live_url,
            skills = []
        } = req.body;

        await client.query("BEGIN");


        const projectResult = await client.query(
            `UPDATE projects
             SET title = $1,
                 description = $2,
                 image_url = $3,
                 github_url = $4,
                 live_url = $5,
                 updated_at = NOW()
             WHERE id = $6
             AND user_id = $7
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


        if (projectResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                error: "Project not found or you are not allowed to update it"
            });
        }


        if (skills.length > 0) {

            const skillResult = await client.query(
                `SELECT id
                 FROM skills
                 WHERE id = ANY($1::int[])
                 AND user_id = $2`,
                [skills, user_id]
            );

            if (skillResult.rows.length !== skills.length) {
                await client.query("ROLLBACK");

                return res.status(400).json({
                    error: "One or more selected skills are invalid"
                });
            }
        }


        await client.query(
            `DELETE FROM project_skills
             WHERE project_id = $1`,
            [id]
        );


        for (const skillId of skills) {
            await client.query(
                `INSERT INTO project_skills
                (project_id, skill_id)
                VALUES ($1, $2)`,
                [id, skillId]
            );
        }


        await client.query("COMMIT");


        res.json({
            ...projectResult.rows[0],
            skills
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(error);

        res.status(500).json({
            error: "Failed to update project"
        });

    } finally {
        client.release();
    }
};


const deleteProject = async (req, res) => {
    const client = await pool.connect();

    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        await client.query("BEGIN");


        await client.query(
            `DELETE FROM project_skills
             WHERE project_id = $1`,
            [id]
        );


        const result = await client.query(
            `DELETE FROM projects
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [id, user_id]
        );


        if (result.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                error: "Project not found or you are not allowed to delete it"
            });
        }


        await client.query("COMMIT");


        res.json({
            message: "Project deleted successfully",
            project: result.rows[0]
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(error);

        res.status(500).json({
            error: "Failed to delete project"
        });

    } finally {
        client.release();
    }
};
const toggleProjectPublish = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        const result = await pool.query(
            `UPDATE projects
             SET is_published = NOT is_published,
                 updated_at = NOW()
             WHERE id = $1
               AND user_id = $2
             RETURNING *`,
            [id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found or you are not allowed to update it"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update project publishing status"
        });
    }
};

const getFeaturedProjects = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                projects.*,
                users.name AS user_name
             FROM projects
             JOIN users
               ON users.id = projects.user_id
             WHERE projects.is_published = true
             ORDER BY projects.created_at DESC
             LIMIT 3`
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch featured projects"
        });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    getMyProjects,
    createProject,
    updateProject,
    deleteProject,
    toggleProjectPublish,
    getFeaturedProjects
};