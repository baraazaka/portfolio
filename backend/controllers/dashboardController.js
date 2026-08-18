const pool = require("../db");

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        const projects = await pool.query(
            `SELECT COUNT(*)
             FROM projects
             WHERE user_id = $1`,
            [userId]
        );

        const skills = await pool.query(
            `SELECT COUNT(*)
             FROM skills
             WHERE user_id = $1`,
            [userId]
        );

        const experiences = await pool.query(
            `SELECT COUNT(*)
             FROM experiences
             WHERE user_id = $1`,
            [userId]
        );

        const messages = await pool.query(
            `SELECT COUNT(*)
             FROM messages
             WHERE receiver_id = $1`,
            [userId]
        );

        const recentProjects = await pool.query(
            `SELECT
                id,
                title,
                description,
                image_url,
                github_url,
                live_url,
                created_at
             FROM projects
             WHERE user_id = $1
             ORDER BY created_at DESC
             LIMIT 5`,
            [userId]
        );

        const recentExperiences = await pool.query(
            `SELECT
                id,
                company,
                postion,
                description,
                start_date,
                end_date
             FROM experiences
             WHERE user_id = $1
             ORDER BY start_date DESC
             LIMIT 5`,
            [userId]
        );

        res.json({
            projectsCount: Number(projects.rows[0].count),
            skillsCount: Number(skills.rows[0].count),
            experiencesCount: Number(experiences.rows[0].count),
            messagesCount: Number(messages.rows[0].count),

            recentProjects: recentProjects.rows,
            recentExperiences: recentExperiences.rows
        });

    } catch (error) {
        console.error("Dashboard stats error:", error);

        res.status(500).json({
            error: "Failed to fetch dashboard stats"
        });
    }
};

module.exports = {
    getDashboardStats
};