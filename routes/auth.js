const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10; // cost factor for producing the hash

// With "salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
// The salt is a random value, and should differ for each calculation, so the result should hardly ever be the same, even for equal passwords.
// The salt is usually included in the resulting hash-string in readable form. So with storing the hash-string you also store the salt. Have a look at this answer for more details.

// "/users/new"
router.post("/register", (req, res) => {
  const { name, age, mood, password } = req.body;

  bcrypt
    .hash(password, saltRounds)
    .then(hashedPassword => {
      return User.create({
        name,
        age,
        mood,
        password: hashedPassword
      });
    })
    .then(userCreated => {
      req.session.user = userCreated
      res.redirect("/users");
    })
    .catch(err => {
      console.log("err", err);
    });

  //first we will encrypt the plain text password
  //then we create user (storing in db), with hashed pw
});

router.post("/login", (req, res, next) => {
  // const name = req.body.name;
  // const password = req.body.password;
  let currentUser;
  const { name, password } = req.body;

  User.findOne({ name })
    .then(user => {
      if (!user) {
        res.redirect("/users");
        return false;
      } else {
        //first arg, is client
        //second arg is from db
        currentUser = user;
        return bcrypt.compare(req.body.password, user.password); //true or false
        //passed down to next .then
      }
    })
    .then(passwordCorrect => {
      if (passwordCorrect) {
        //storing session in our database
        //and set cookie in client.
        const session = req.session;
        session.user = currentUser;
        res.redirect("/profile");
        return;
      } else {
        res.send("Credentials don't match.");
        return;
      }
    })
    .catch(err => {
      debugger;
      console.log("err", err);
    });
});

module.exports = router;
