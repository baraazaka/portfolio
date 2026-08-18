const pool = require("../db");

const getPublicPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const userResult = await pool.query(
            `SELECT id, name, email, username
             FROM users
             WHERE username = $1
             AND portfolio_published = TRUE`,
            [username]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: "Portfolio not found"
            });
        }

        const user = userResult.rows[0];

        const projectsResult = await pool.query(
            `SELECT id, title, description, image_url,
                    github_url, live_url, created_at
             FROM projects
             WHERE user_id = $1
             AND published = TRUE
             ORDER BY created_at DESC`,
            [user.id]
        );

        const skillsResult = await pool.query(
            `SELECT id, name, category, level
             FROM skills
             WHERE user_id = $1
             ORDER BY name ASC`,
            [user.id]
        );

        const experiencesResult = await pool.query(
            `SELECT id, company, position, description,
                    start_date, end_date
             FROM experiences
             WHERE user_id = $1
             ORDER BY start_date DESC`,
            [user.id]
        );

        res.json({
            user,
            projects: projectsResult.rows,
            skills: skillsResult.rows,
            experiences: experiencesResult.rows
        });

    } catch (error) {
        console.error(
            "Public portfolio error:",
            error
        );

        res.status(500).json({
            error: "Failed to load portfolio"
        });
    }
};

module.exports = {
    getPublicPortfolio
};