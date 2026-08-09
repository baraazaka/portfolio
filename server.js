const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Portfolio API is running!");
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Database connected!",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database connection failed"
        });
    }
});
app.get("/api/projects",async (req,res)=>{
    try{
      const result=await pool.query("select * from projects  order by created_at desc");
      res.json(result.rows);

    }
    catch(error){
      console.error(error);
      res.status(500).json({"error":"faild to fetch projects"});
    }
});

app.post("/api/projects", async (req, res) => {
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
        console.log(error);

        res.status(500).json({
            error: "Failed to create project"
        });
    }
});
app.get("/api/projects/:id", async (req, res) => {
    try {
        const { id } = req.params;

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
app.put("/api/projects/:id", async (req, res) => {
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
app.delete("/api/projects/:id", async (req, res) => {
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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
