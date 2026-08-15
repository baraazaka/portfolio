const pool = require("../db");

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        const projects = await pool.query(
            "SELECT COUNT(*) FROM projects WHERE user_id = $1",
             [userId]);

             const skills = await pool.query(
            "SELECT COUNT(*) FROM skills WHERE user_id = $1",
            [userId]);

            const experiences = await pool.query(
             "SELECT COUNT(*) FROM experiences WHERE user_id = $1",
                [userId]);

                 res.json({
        projectsCount: Number(projects.rows[0].count),
        skillsCount: Number(skills.rows[0].count),
        experiencesCount: Number(experiences.rows[0].count)
    });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch dashboard stats"
        });
    }
};

module.exports = {
    getDashboardStats
};