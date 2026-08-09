const pool=requre("../db");

const getProject=async (req,res=>{
    try{
        const result= await pool.qurey("select * from projects order by created_at desc");
        res.json(result.rows);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"failed to featch projects"});
    }
});


const getProjectById=async (req,res=>{
    try{
    const id = req.params.id;
        const result=await pool.qurey("select * from projects where id=$1",[id]);
        if(result.rows.length==0){
            res.status(404).json({error:"project not found"});
        }
        res.json(result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to fetch projects"});
    }
});
const createProject=async(req,res=>{
    try{
        const{user_id,titile,description,image_url,github_url,live_url}=req.body;
        const result=await pool.qurey(
            'insert into projects(user_id,title,description,image_url,github_url,live_url) values($1,$2,$3,$4,$5,$6)RETERNING*',
            [
                user_id,
                titile,
                description,
                image_url,
                github_url,
                live_url

            ]
        );
        res.status(201).json(result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"failed to created"});
    }
});
const updateProject=async (req,res=>{
    try{
        const id=req.params.id;
        const{title,description,image_url,github_url,live_url}
        const result=await pool.qurey(
            'update projects set title=$1,description=$2,image_url=$3,github_url=$4,live_url=$5 RETERNING*',
            [title,description,image_url,github_url,live_url,id]);
        
            if(result.rows.length==0){
                res.status(404).json({error:"projects not found"})
            }
            res.json(result.rows(0));


    }catch(error){
        console.log(error);
        res.status(500).json({error:"failed to update"});
    }
});


module.exports={
    getProjects,
    getProjectById,
    createProject,
    updateProject
};