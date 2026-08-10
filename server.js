const express = require("express");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes=require("./routes/skillRoutes");
const projectSkillRoutes = require("./routes/projectSkillRoutes");
const userRoutes = require("./routes/userRoutes");
const experienceRoutes = require("./routes/experienceRoutes");

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills",skillRoutes);
app.use("/api/project-skills", projectSkillRoutes);
app.use("/api/experiences", experienceRoutes);

app.get("/", (req, res) => {
    res.send("Portfolio API is running!");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});