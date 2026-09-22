const router=require("express").Router();
const auth=require("../middleware/authMiddleware");
const {markComplete,getStreak}=require("../controllers/streakController");
router.post("/complete",auth,markComplete);
router.get("/",auth,getStreak);
module.exports=router;
