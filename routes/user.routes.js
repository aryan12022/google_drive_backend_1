const express = require('express')
const router = express.Router();
const usermodel=require('../models/user.model.js')
const { body,validationResult} = require('express-validator');
router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',
     body('email').trim().isEmail(),
     body('password').trim().isLength({min:5}),
     body('username').trim().isLength({min:3}),
   async (req,res)=>{
   const errors=validationResult(req);
   
   if(!errors.isEmpty()){
    return res.status(400).json({
        errors:errors.array(),
        message:'Invalid data'
    })
   }
    const {email,username,password}=req.body
 const newUser=await usermodel.create({
    email,
    username,
    password
})
res.json(newUser)
    
})

module.exports=router