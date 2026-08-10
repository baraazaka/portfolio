const pool = require("../db");


const getSkills = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM skills ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch skills"
        });
    }
};

const getSkillById=async (req,res)=>{
    try{
        const id=req.params.id;
        const result=await pool.query(
            `
            select * from skills where id=$1
            `,[id]
        );
        if (result.rows.length==0){
            res.status(404).json({error:"not found skills"});

        };
        res.json(result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({error :"failed to featch "});
    };
};

const createSkill = async (req, res) => {
    try {
        const {
            user_id,
            name,
            category,
            level
        } = req.body;

        const result = await pool.query(
            `INSERT INTO skills
            (user_id, name, category, level)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                user_id,
                name,
                category,
                level
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to create skill"
        });
    }
};

const updateSkill=async (req,res)=>{
    try{
        const id=req.params.id;
        const{name,category,length}=req.body;
        const result=await pool.query(
            `
            update skills
            set name=$1و
            category=$2,
            level=$3
            RETERNING *
            
            `,
            [
               
                name,
                category,
                level,
                id
            ]
        );
        if(result.rows.level==0){
            res.status(404).json({error:"not found skills"});
        }
        res.json(result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"faild to update skill"});
    }
};

const deleteSkill=async (req,res)=>{
    try{

    
    const id=req.params.id;
    const result=await pool.query("delete from skills where id=$1",[id]);
    if(result.rows.length==0){
        res.status(404).json({error:"not found skill"});

    }
    res.json({error:"done selete",project:result.rows[0]});

    }catch(error){
        console.log(error);
        res.status(500).json({error:"failed to delete skill"});
    }
}
module.exports = {
    getSkills,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill
};