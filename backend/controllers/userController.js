const pool = require("../db");


// =========================
// Build Full Image URL
// =========================

const getFullImageUrl = (req, imageUrl) => {
    if (!imageUrl) {
        return null;
    }

    // إذا كان الرابط كاملًا أصلًا
    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    return `${req.protocol}://${req.get("host")}${imageUrl}`;
};


// =========================
// Get All Users
// =========================

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at
             FROM users
             ORDER BY created_at DESC`
        );

        const users = result.rows.map((user) => ({
            ...user,
            profile_image_url: getFullImageUrl(
                req,
                user.profile_image_url
            )
        }));

        res.json(users);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
};


// =========================
// Get User By ID
// =========================

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT
                id,
                name,
                username,
                email,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at
             FROM users
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const user = result.rows[0];

        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );

        res.json(user);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch user"
        });
    }
};


// =========================
// Get My Profile
// =========================

const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at
             FROM users
             WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const user = result.rows[0];

        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );

        res.json(user);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch profile"
        });
    }
};


// =========================
// Create User
// =========================

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
             VALUES
                ($1, $2, $3, $4)
             RETURNING
                id,
                name,
                email,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at`,
            [
                name,
                email,
                password,
                username
            ]
        );

        const user = result.rows[0];

        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );

        res.status(201).json(user);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to create user"
        });
    }
};


// =========================
// Update User Profile
// =========================

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        const {
            name,
            bio,
            profile_image_url,
            location,
            job_title,
            website_url,
            github_url,
            linkedin_url
        } = req.body;

        if (Number(id) !== Number(userId)) {
            return res.status(403).json({
                error: "You are not allowed to update this user"
            });
        }

        const result = await pool.query(
            `UPDATE users
             SET
                name = $1,
                bio = $2,
                profile_image_url = $3,
                location = $4,
                job_title = $5,
                website_url = $6,
                github_url = $7,
                linkedin_url = $8
             WHERE id = $9
             RETURNING
                id,
                name,
                email,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at`,
            [
                name,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const user = result.rows[0];

        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );

        res.json(user);

    } catch (error) {
        console.error("Update user error:", error);

        res.status(500).json({
            error: "Failed to update user"
        });
    }
};


// =========================
// Delete User
// =========================

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        if (Number(id) !== Number(userId)) {
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


// =========================
// Public Portfolio
// =========================

const getPublicPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const userResult = await pool.query(
            `SELECT
                id,
                name,
                email,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url
             FROM users
             WHERE username = $1
             AND portfolio_published = TRUE`,
            [username]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: "Portfolio not found or not published"
            });
        }

        const user = userResult.rows[0];

        // تحويل صورة البروفايل إلى رابط كامل
        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );


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
                postion AS position,
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
        console.error("Public portfolio error:", error);

        res.status(500).json({
            error: "Failed to load public portfolio"
        });
    }
};


// =========================
// Publish Portfolio
// =========================

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
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const user = result.rows[0];

        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );

        res.json({
            message: "Portfolio published successfully",
            user
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to publish portfolio"
        });
    }
};


// =========================
// Update My Profile
// =========================

const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {
            name,
            bio,
            location,
            job_title,
            website_url,
            github_url,
            linkedin_url
        } = req.body;

        let profileImageUrl = null;

        if (req.file) {
            profileImageUrl = `/uploads/profile/${req.file.filename}`;
        }

        const result = await pool.query(
            `UPDATE users
             SET
                name = $1,
                bio = $2,
                profile_image_url =
                    COALESCE($3, profile_image_url),
                location = $4,
                job_title = $5,
                website_url = $6,
                github_url = $7,
                linkedin_url = $8
             WHERE id = $9
             RETURNING
                id,
                name,
                email,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at`,
            [
                name,
                bio,
                profileImageUrl,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const user = result.rows[0];

        // مهم: نخلي الرابط كامل بالـ response
        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );

        res.json(user);

    } catch (error) {
        console.error("Update my profile error:", error);

        res.status(500).json({
            error: "Failed to update profile"
        });
    }
};

const getPublishedPortfolios = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                id,
                name,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at
             FROM users
             WHERE portfolio_published = TRUE
             ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Published portfolios error:", error);

        res.status(500).json({
            error: "Failed to fetch published portfolios"
        });
    }
};


const getFeaturedPortfolios = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                id,
                name,
                username,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published,
                created_at
             FROM users
             WHERE portfolio_published = TRUE
             ORDER BY created_at DESC
             LIMIT 3`
        );

        const portfolios = result.rows.map((portfolio) => ({
            ...portfolio,
            profile_image_url: getFullImageUrl(
                req,
                portfolio.profile_image_url
            )
        }));

        res.json(portfolios);

    } catch (error) {
        console.error(
            "Featured portfolios error:",
            error
        );

        res.status(500).json({
            error: "Failed to fetch featured portfolios"
        });
    }
};
// =========================
// Unpublish Portfolio
// =========================

const unpublishPortfolio = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        if (Number(id) !== Number(userId)) {
            return res.status(403).json({
                error: "You are not allowed to unpublish this portfolio"
            });
        }

        const result = await pool.query(
            `UPDATE users
             SET portfolio_published = FALSE
             WHERE id = $1
             RETURNING
                id,
                name,
                username,
                email,
                bio,
                profile_image_url,
                location,
                job_title,
                website_url,
                github_url,
                linkedin_url,
                portfolio_published`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const user = result.rows[0];

        user.profile_image_url = getFullImageUrl(
            req,
            user.profile_image_url
        );

        res.json({
            message: "Portfolio unpublished successfully",
            user
        });

    } catch (error) {
        console.error("Unpublish portfolio error:", error);

        res.status(500).json({
            error: "Failed to unpublish portfolio"
        });
    }
};
// =========================
// Export
// =========================

module.exports = {
    getUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
    createUser,
    updateUser,
    deleteUser,
    getPublicPortfolio,
    publishPortfolio,
    getPublishedPortfolios,
getFeaturedPortfolios,
unpublishPortfolio
};