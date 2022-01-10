const express =require('express');
const router=express.Router()
const User = require("../models/User")


const mongoose=require("mongoose")
const { Schema } = mongoose;

const { body, validationResult } = require('express-validator');

router.post('/createUser',[

  
        
    body('email',"Invalid mail").isEmail(),
    body('password',"Invalid pass").isLength({ min: 5 }),
    body('name',"Invalid name").isLength({ min: 3})

   


        ],async (req,res)=>{


            

            

            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            try{

            // user = await User.create({
            //     name: req.body.name,
            //     password: req.body.password,
            //     email: req.body.email
            //   });
            // res. json(user)
            const b=new Schema(
            {hai:{
                type : Number
            }}
            )

            const d=mongoose.model("b",b);
            c=await d.create({hai:5});

              res.json(c);
           
          

        }catch(error){
            console.log(error)
            return res.status(400).json(error);
            // return res.status(400).json({"errr":"Some error occured"});
        }

            
              

})
router.post('/',(req,res)=>{
    obj={
        "name" : "boommm"
    }
    res.json(obj);
})

module.exports = router;