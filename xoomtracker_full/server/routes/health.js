const router = require("express").Router();
const auth=require("../middleware/authMiddleware");
const {addEntry,getEntries}=require("../controllers/healthController");
router.post("/",auth,addEntry);
router.get("/",auth,getEntries);
module.exports=router;
