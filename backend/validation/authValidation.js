const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(2),

    username: z
        .string()
        .min(3)
        .max(30)
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        ),

    email: z.string().email(),

    password: z.string().min(6)
});

const loginSchema = z.object({
    email: z.string().email(),

    password: z.string().min(6)
});

module.exports = {
    registerSchema,
    loginSchema
};