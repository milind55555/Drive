const express =require("express")
const router=express.Router();
const { body ,validationResult } = require('express-validator');
// /user/test 
router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",
    body('email').trim().isEmail().isLength({min:13}),
    body('username').trim().isLength({min:5}),
    body('password').trim().isLength({min:3}),
    (req,res)=>{

        const error = validationResult(req)
        console.log(error);

        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array(),
                message:"Invalid data"
            })
        }

        res.send(error)
        
    // console.log(req.body);
    // res.send("User Registered!!")
    
})

module.exports = router; // in last line