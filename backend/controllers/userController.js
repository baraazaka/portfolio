const pool = require("../db");


const getUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, username, portfolio_published, created_at
             FROM users
             ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT id, name, email, username, portfolio_published, created_at
             FROM users
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch user"
        });
    }
};


const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            username
        } = req.body;

        const result = await pool.query(
            `INSERT INTO users
            (name, email, password, username)
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                name,
                email,
                username,
                portfolio_published,
                created_at`,
            [
                name,
                email,
                password,
                username
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to create user"
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        const {
            name,
            email,
            password,
            username
        } = req.body;

        if (Number(id) !== Number(user_id)) {
            return res.status(403).json({
                error: "You are not allowed to update this user"
            });
        }

        const result = await pool.query(
            `UPDATE users
             SET name = $1,
                 email = $2,
                 password = $3,
                 username = $4
             WHERE id = $5
             RETURNING
                 id,
                 name,
                 email,
                 username,
                 portfolio_published,
                 created_at`,
            [
                name,
                email,
                password,
                username,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to update user"
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.userId;

        if (Number(id) !== Number(user_id)) {
            return res.status(403).json({
                error: "You are not allowed to delete this user"
            });
        }

        const result = await pool.query(
            `DELETE FROM users
             WHERE id = $1
             RETURNING id, name, email`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to delete user"
        });
    }
};


const getPublicPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const userResult = await pool.query(
            `SELECT
                id,
                name,
                email,
                username
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
             AND is_published = TRUE
             ORDER BY created_at DESC`,
            [user.id]
        );


        const skillsResult = await pool.query(
            `SELECT
                id,
                name,
                category,
                level
             FROM skills
             WHERE user_id = $1
             ORDER BY name ASC`,
            [user.id]
        );


        const experiencesResult = await pool.query(
            `SELECT
                id,
                company,
                position,
                description,
                start_date,
                end_date
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
        console.log(error);

        res.status(500).json({
            error: "Failed to load public portfolio"
        });
    }
};
const publishPortfolio = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        if (Number(id) !== Number(userId)) {
            return res.status(403).json({
                error: "You are not allowed to publish this portfolio"
            });
        }

        const result = await pool.query(
            `UPDATE users
             SET portfolio_published = TRUE
             WHERE id = $1
             RETURNING
                id,
                name,
                username,
                email,
                portfolio_published`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.json({
            message: "Portfolio published successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to publish portfolio"
        });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getPublicPortfolio,
    publishPortfolio
};