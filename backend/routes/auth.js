const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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
      console.log(user);
      // if user already exist then return bad req
      if (user) {
        return res.status(400).json({ error: "Sorry this user already exist" });
      }

      const salt = bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //  if not then create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // sending response of the created user
      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
