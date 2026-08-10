const express=require("express");

const{getSkills}=require("../controllers/skillConrtoller");

const router=express.Router();

router.get("/",getSkills);
module.exports=router;