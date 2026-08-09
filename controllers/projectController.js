const pool=requre("../db");

const getProjects=async (req,res=>{
    try{
        const result= await pool.qurey("select * from projects order by created_at desc");
        res.json(result.rows);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"failed to featch projects"});
    }
});

module.exports={
    getProjects
};