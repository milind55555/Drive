const express =require("express")
const router=express.Router();
const { body ,validationResult } = require('express-validator');
const userModel=require("../models/user.model.js")
const bcrypt = require('bcrypt'); 
const jwt=require('jsonwebtoken')

// /user/test 
router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",
  body('email').trim().isEmail().isLength({ min: 13 }),
  body('username').trim().isLength({ min: 5 }),
  body('password').trim().isLength({ min: 3 }),
  async (req, res) => {
    console.log("Incoming form data:", req.body);  // 👈 ADD THIS
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
        message: "Invalid data"
      });
    }

    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password,10); // Hashing the password with a salt rounds of 10
    console.log("Hashed password:", hashPassword);  // 👈 ADD THIS


    const newUser = await userModel.create({ 
        username, 
        email,
        password: hashPassword
    });
    res.json(newUser);
});

router.get("/login",(req,res)=>{
    res.render("login")
})

router.post("/login",
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:4}), // changed from min:5 to min:4
    async (req,res)=>{



        const  error =validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array(),
                message:'invalide data'
            }) 
        }

        const { username ,password }=req.body;

        const user =  await userModel.findOne({
            username:username 
        })
        if(!user){
            return res.status(400).json({
                message:'username or password is incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                 message:'username or password is incorrect'
            })
        }
        // jsonwebtoken ..jwt

        const token=jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },
        process.env.JWT_SECRET,
    )


        res.cookie('token',token)

        res.send('Logged In')









    }
)


module.exports = router; // in last line