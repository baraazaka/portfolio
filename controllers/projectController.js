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
module.exports={
    getProjects,
    getProjectById
};