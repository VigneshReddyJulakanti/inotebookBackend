const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');


const JWT_SECRET="liongiraffe";

const { body, validationResult } = require("express-validator");

router.post(
  "/createUser",
  [
    body("email", "Invalid mail").isEmail(),
    body("password", "Invalid pass").isLength({ min: 5 }),
    body("name", "Invalid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        console.log("EMail already exists .......................");
      }

      const salt = await bcrypt.genSaltSync(8);
      const secpassword = await bcrypt.hashSync(req.body.password, salt);

      

      user = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
      });
      const data={
          user :{
              id:user.id
          }
      }

      var authtoken = jwt.sign(data, JWT_SECRET);
      res.json ({authtoken})



    //   res.json(user);
    } catch (error) {
      console.log(error)
      return res.status(400).json(error);
      // return res.status(400).json({"errr":"Some error occured"});
    }
  }
);
router.post("/", (req, res) => {
  obj = {
    name: "boommm",
  };
  res.json(obj);
});

module.exports = router;
