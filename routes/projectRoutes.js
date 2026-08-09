const express = require("express");

const router = express.Router();



const{getProject,getProjectById,createProject,updateProject}=require("../controllers/projectController");
router.get("/",getProject);
router.get("/:id",getProjectById);
router.post("/",createProject);
router.put("/:id",updateProject);







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