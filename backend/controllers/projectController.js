const pool = require("../db");

const getFullImageUrl = (req, imageUrl) => {
    if (!imageUrl) {
        return null;
    }

    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    return `${req.protocol}://${req.get("host")}${imageUrl}`;
};
const getProjects = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                projects.*,
                users.name AS user_name,
                users.profile_image_url,

                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', skills.id,
                            'name', skills.name,
                            'category', skills.category,
                            'level', skills.level
                        )
                    ) FILTER (WHERE skills.id IS NOT NULL),
                    '[]'
                ) AS skills

             FROM projects

             JOIN users
                ON users.id = projects.user_id

             LEFT JOIN project_skills
                ON project_skills.project_id = projects.id

             LEFT JOIN skills
                ON skills.id = project_skills.skill_id

             WHERE projects.is_published = true

             GROUP BY
                projects.id,
                users.name,
                users.profile_image_url

             ORDER BY projects.created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Get projects error:", error);

        res.status(500).json({
            error: "Failed to fetch published projects"
        });
    }
};
const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT
                p.*,
                u.name AS user_name,
                u.profile_image_url AS user_profile_image_url,

                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', s.id,
                            'name', s.name,
                            'category', s.category,
                            'level', s.level
                        )
                    ) FILTER (WHERE s.id IS NOT NULL),
                    '[]'
                ) AS skills

             FROM projects p

             JOIN users u
                ON u.id = p.user_id

             LEFT JOIN project_skills ps
                ON ps.project_id = p.id

             LEFT JOIN skills s
                ON s.id = ps.skill_id

             WHERE p.id = $1
               AND p.is_published = true

             GROUP BY
                p.id,
                u.name,
                u.profile_image_url`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        const project = result.rows[0];

        project.user_profile_image_url = getFullImageUrl(
            req,
            project.user_profile_image_url
        );

        res.json(project);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch project"
        });
    }
};

const getMyProjects = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT
                p.*,

                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', s.id,
                            'name', s.name,
                            'category', s.category,
                            'level', s.level
                        )
                    ) FILTER (WHERE s.id IS NOT NULL),
                    '[]'
                ) AS skills

             FROM projects p

             LEFT JOIN project_skills ps
                ON ps.project_id = p.id

             LEFT JOIN skills s
                ON s.id = ps.skill_id

             WHERE p.user_id = $1

             GROUP BY p.id

             ORDER BY p.created_at DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Get my projects error:", error);

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
            github_url,
            live_url,
            skills = []
        } = req.body;

        const user_id = req.user.userId;

        const image_url = req.file
            ? `/uploads/projects/${req.file.filename}`
            : null;

        await client.query("BEGIN");

        const projectResult = await client.query(
            `INSERT INTO projects
            (
                user_id,
                title,
                description,
                image_url,
                github_url,
                live_url
            )
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

        console.error("Create project error:", error);

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
            github_url,
            live_url,
            skills = []
        } = req.body;


        // =========================
        // Normalize Skills
        // =========================

        let normalizedSkills = skills;

        // إذا وصلت skill واحدة كنص
        if (!Array.isArray(normalizedSkills)) {
            normalizedSkills = [normalizedSkills];
        }

        // تحويل IDs إلى أرقام
        normalizedSkills = normalizedSkills
            .filter(
                (skillId) =>
                    skillId !== null &&
                    skillId !== undefined &&
                    skillId !== ""
            )
            .map((skillId) => Number(skillId));


        // التأكد أن كل skill ID رقم صحيح
        if (
            normalizedSkills.some(
                (skillId) =>
                    !Number.isInteger(skillId) ||
                    skillId <= 0
            )
        ) {
            return res.status(400).json({
                error: "Invalid skill IDs"
            });
        }


        await client.query("BEGIN");


        // =========================
        // Update Project
        // =========================

        let projectResult;

        if (req.file) {

            const image_url =
                `/uploads/projects/${req.file.filename}`;

            projectResult = await client.query(
                `UPDATE projects
                 SET
                    title = $1,
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

        } else {

            projectResult = await client.query(
                `UPDATE projects
                 SET
                    title = $1,
                    description = $2,
                    github_url = $3,
                    live_url = $4,
                    updated_at = NOW()
                 WHERE id = $5
                 AND user_id = $6
                 RETURNING *`,
                [
                    title,
                    description,
                    github_url,
                    live_url,
                    id,
                    user_id
                ]
            );
        }


        // =========================
        // Project Not Found
        // =========================

        if (projectResult.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(404).json({
                error:
                    "Project not found or you are not allowed to update it"
            });
        }


        // =========================
        // Validate Skills
        // =========================

        if (normalizedSkills.length > 0) {

            const skillResult = await client.query(
                `SELECT id
                 FROM skills
                 WHERE id = ANY($1::int[])
                 AND user_id = $2`,
                [
                    normalizedSkills,
                    user_id
                ]
            );


            if (
                skillResult.rows.length !==
                normalizedSkills.length
            ) {

                await client.query("ROLLBACK");

                return res.status(400).json({
                    error:
                        "One or more selected skills are invalid"
                });
            }
        }


        // =========================
        // Remove Old Skills
        // =========================

        await client.query(
            `DELETE FROM project_skills
             WHERE project_id = $1`,
            [id]
        );


        // =========================
        // Add New Skills
        // =========================

        for (const skillId of normalizedSkills) {

            await client.query(
                `INSERT INTO project_skills
                (project_id, skill_id)
                VALUES ($1, $2)`,
                [
                    id,
                    skillId
                ]
            );
        }


        // =========================
        // Commit
        // =========================

        await client.query("COMMIT");


        res.json({
            ...projectResult.rows[0],
            skills: normalizedSkills
        });


    } catch (error) {

        await client.query("ROLLBACK");

        console.error(
            "Update project error:",
            error
        );

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
                users.name AS user_name,
                users.profile_image_url
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