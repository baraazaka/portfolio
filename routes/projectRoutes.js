const express = require("express");
const pool = require("../db");

const router = express.Router();



const{getProjects}=require("../controllers/projectController");
router.get("/",getProjects);

router.get("/:id", async (req, res) => {
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
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch project"
        });
    }
});



router.post("/", async (req, res) => {
    try {
        const {
            user_id,
            title,
            description,
            image_url,
            github_url,
            live_url
        } = req.body;

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
        console.error(error);

        res.status(500).json({
            error: "Failed to create project"
        });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;

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
             WHERE id = $6
             RETURNING *`,
            [
                title,
                description,
                image_url,
                github_url,
                live_url,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update project"
        });
    }
});



router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "DELETE FROM projects WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Project not found"
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
});


module.exports = router;