//import express packages
const express = require("express");
const session = require("express-session");
const app = express();
const port = 8000;
const path = require("path");
const slug = require("slug"); // COMMENT: Importing slug but not using it, consider using it or uninstalling it (npm uninstall <package>) and removing it here
const bodyParser = require("body-parser");
const find = require("array-find"); // COMMENT: Importing array-find but not using it, consider using it or uninstalling it (npm uninstall <package>) and removing it here
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
const mongoose = require("mongoose"); // COMMENT: Importing mongoose but not using it, consider using it or uninstalling it (npm uninstall <package>) and removing it here
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongo = require("mongodb");
const ObjectID = mongo.ObjectID;

let usersMultiple;

// Database MongoDB
require("dotenv").config();

let db = null;
const uri = process.env.DB_URI;

mongo.MongoClient.connect(uri, function(err, client) {
  if (err) {
    throw err;
  }

  db = client.db(process.env.DB_NAME);
  usersMultiple = db.collection(process.env.DB_NAME);
  usersMultiple.createIndex({ username: 1 }, { unique: true });
});

// Middelware set-up:
// Using static files from static directory:
app.use("/static", express.static("static"));

// Locate ejs(templating) (and views)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(urlencodedParser);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    secure: true
  })
);

// routing
app.get("/", function(req, res) {
  res.render("index.ejs");
});
app.get("/profile", function(req, res) {
  console.log(req.session.userId);
  db.collection("users")
    .findOne({
      _id: ObjectID(req.session.userId)
    })
    .then(data => {
      res.render("profile.ejs", { data });
    })
    .catch(err => {
      console.log(err);
      res.redirect("404error");
    });
});

app.get("/profileedit", function(req, res) {
  console.log("Bewerken");
  db.collection("users")
    .update({
      _id: ObjectID(req.session.userId)
    })
    .then(data => {
      res.render("profileedit.ejs", { data });
    })
    .catch(err => {
      console.log(err);
      res.redirect("404error");
    });
});

// COMMENT: It can be a way of solving the progessive enhancement issue with a long form this way, but your slider is not really a slider right now
app.get("/registreer_p1", function(req, res) {
  res.render("registreer_p1.ejs");
});
app.get("/registreer_p2", function(req, res) {
  res.render("registreer_p2.ejs");
});
app.get("/registreer_p3", function(req, res) {
  res.render("registreer_p3.ejs");
});
app.get("/registreer_p4", function(req, res) {
  res.render("registreer_p4.ejs");
});
app.get("*", function(req, res) {
  res.render("404error");
});

app.post("/logout", function (req, res) {
    req.session.destroy();
    res.redirect('/');
});
app.post("/", login);
app.post("/registrate", upload.single("photo"), urlencodedParser, makeUser);

function login(req, res) {
  db.collection("users")
    .findOne({
      firstName: req.body.firstName,
      password: req.body.password
    })
    .then(data => {
      console.log("Ingelogd!");
      req.session.userId = data._id;
      if (data) {
        res.redirect("/profile");
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect("404error");
    });
}

// register and the app makes an user in de DB
function makeUser(req, res) {
    // You had this as a let, while you don't manipulate this data. Then it should be a const.
  const data = {
    firstName: req.body.firstName,
    gender: req.body.gender,
    searchSex: req.body.searchSex,
    age: req.body.age,
    hometown: req.body.hometown,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo
  };

  db.collection("users").insertOne(data, function(err, collection) {
    if (err) {
      throw err;
    } else {
      console.log("User added");
      console.log(data);
      res.render("registreer_p4.ejs");
    }
  });
}

// Server is listening on port:
app.listen(port, () => console.log("listening on port " + port));

// COMMENT: I see you're using different ways to get items from the database:
// callbacks & promises. Try to stick to one of them to stay consistant.