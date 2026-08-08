const express = require("express");

const app = express();

const PORT = 5000;
app.use(express.json());
const projects = [
    {
        id: 1,
        title: "Fabric AI",
        description: "Fabric defect detection system"
    },
    {
        id: 2,
        title: "FunRoom",
        description: "Multiplayer web application"
    }
];

app.get("/", (req, res) => {
  res.send("Portfolio API is running!");
});
app.get("/api/projects",(req,res)=>{
  res.json(projects);
})

app.post("/api/projects", (req, res) => {
    const newProject = {
        id: projects.length + 1,
        title: req.body.title,
        description: req.body.description
    };

    projects.push(newProject);

    res.status(201).json(newProject);
});
app.put("/api/projects/:id",(req,res)=>{
  const projectId=parseInt(req.params.id);
  const project=projects.find(project=>project.id==projectId)
  if(!project){
    return res.status(404).json({"message":"project not found"});

  }
  project.title=req.body.title;
  project.description=req.body.description;
  res.json(project);
});
app.delete("api/prjects/:id",(req,res)=>{
  const prjectId=prearseInt(req.params.id);
  const projectIndex=projects.findIndex(project=>project.id==prjectId);
  if(projectIndex==-1){
    return res.status(404).json({"message":"prject not found"});
  }
  const deletedProject=prjects.splice(prjectIndex,1);
  res.json(deletedProject);
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});