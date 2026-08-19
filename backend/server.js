const express = require("express");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes=require("./routes/skillRoutes");
const projectSkillRoutes = require("./routes/projectSkillRoutes");
const userRoutes = require("./routes/userRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills",skillRoutes);
app.use("/api/project-skills", projectSkillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
app.get("/", (req, res) => {
    res.send("Portfolio API is running!");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});