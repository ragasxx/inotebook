const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hellofuncti@n";

// create a user with validations

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 8 characters long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // return bad req and errors if there is any.......
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  try catch method for creating and catching errors
    try {
      let user = await User.findOne({ email: req.body.email });

      // if user already exist then return bad req
      if (user) {
        return res.status(400).json({ error: "Sorry this user already exist" });
      }

      // salt add some extra string and hashing converts that pass into some hash and stores it into db
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //  if not then create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // sending response of the created user
      // res.json(user);

      // now we want to send jwt instead of user data
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// to login a user /api/auth/login

router.post(
  "/login",
  // validations using express-validator
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // return bad req and errors if there is any.......
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  destructuring or you can use User.find({email:req.body.email})
    const { email, password } = req.body;

    try {
      // finding a user if it exist
      let user = await User.findOne({ email });
      //  wrong credentials
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      //  if exist then will compare the passwords using bcrypt.compare
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      // sending the data and secret key
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
