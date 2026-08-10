const pool=requre(".../db");



const getSkills=async (req,res=>{
    try{
        const result=await.pool.query("select * from skills order by created_at desc" );

        res.json(result.rows);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to fetch skills "});
    }
});

module.exports={
    getSkills
}