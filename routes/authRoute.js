const express=require("express");
const { Register, Login, Logout } = require("../controllers/authController");
const User = require("../models/userModel");

const router=express.Router();

router.post('/register',Register)
router.post('/login',Login)
router.post('/logout',Logout)
router.get('/hi',async(req,res)=>{
    try {
        console.log('hi')
        const user=await User.find({})
        return res.send(user)
    } catch (error) {
        console.log(error)
    }

})



module.exports=router