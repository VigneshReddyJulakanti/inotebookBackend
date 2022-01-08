const express =require('express');
const router=express.Router()
const User = require("../models/User")

router.get('/',(req,res)=>{
        console.log(req.body);
        const user =User(req.body);
        user.save();
        res.send(req.body); 
})
router.post('/',(req,res)=>{
    obj={
        "name" : "boommm"
    }
    res.json(obj);
})

module.exports = router;