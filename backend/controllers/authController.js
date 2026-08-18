const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const {
    registerSchema,
    loginSchema
} = require("../validation/authValidation");

const register = async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: validation.error.issues
            });
        }

        const {
            name,
            username,
            email,
            password
        } = validation.data;

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1 OR username = $2",
            [email, username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                error: "Email or username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
                (name, username, email, password)
             VALUES
                ($1, $2, $3, $4)
             RETURNING
                id,
                name,
                username,
                email,
                portfolio_published,
                created_at`,
            [
                name,
                username,
                email,
                hashedPassword
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to register user"
        });
    }
};
const login = async (req, res) => {
    try {
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                 error: validation.error.issues
        }   );
        }
        const { email, password } = validation.data;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const isValidPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to login"
        });
    }
};

module.exports = {
    register,
    login
};