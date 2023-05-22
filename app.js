require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userDB', {
//   useNewUrlParser: true,
//  });
mongoose.connect("mongodb://127.0.0.1/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});



userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);

app.listen(3000, () => {
  console.log("listening on");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.render("secrets");
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.post("/login", (req, res) => {
//     const userName = req.body.username;
//     const password = req.body.password;
  
//     User.findOne({ email: userName }, function (err, foundUser) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (foundUser) {
//           if (foundUser.password === password) {
//             res.render("secrets");
//           }
//         }
//       }
//     });
//   });

  app.post("/login", (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
  
    User.findOne({ email: userName })
      .then((foundUser) => {
        if (foundUser && foundUser.password === password) {
          res.render("secrets");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  