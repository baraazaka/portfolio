const express = require("express");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes=require("./routes/skillRoutes");
const projectSkillRoutes = require("./routes/projectSkillRoutes");
const app = express();

app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/skills",skillRoutes);
app.use("/api/project-skills", projectSkillRoutes);
app.get("/", (req, res) => {
    res.send("Portfolio API is running!");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});