//import express packages
const cc = require ('camelcase');
const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const multer= require('multer');
const upload = multer({ dest: 'uploads/' });
const mongo = require ('mongodb');
const session = require ('express-session');
let usersMultiple;
const ObjectID = mongo.ObjectID;



// Database MongoDB
require('dotenv').config();      

let db = null;
const uri = process.env.DB_URI;

mongo.MongoClient.connect(uri, function(err, client) {
  if (err) {
    throw err
  }

  db = client.db(process.env.DB_NAME)
  usersMultiple = db.collection(process.env.DB_NAME);
  usersMultiple.createIndex({ firstName: 1 }, {unique: true});
});



// Middelware set-up:
// Using static files from static directory:
app.use('/static', express.static('static'));

//Locate ejs(templating) (and views) 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(urlencodedParser);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        secure: true
})
);


// Routing 
app.get('/', function(req, res) {
    res.render('index.ejs')
});
app.get('/profile', function(req, res) {
    console.log(req.session.userId);
    db.collection('users')
        .findOne({
            _id : ObjectID(req.session.userId)
    })
    .then(data=>{
        res.render('profile.ejs' , {data});
    })
    .catch(err=>{
        console.log(err);
        res.redirect('404error');
    });
});


app.get('/registreer_p1', function(req, res) {
    res.render('registreer_p1.ejs');
});
app.get('/registreer_p4', function(req, res) {
    res.render('registreer_p4.ejs');
});
app.post('/', login);
app.post('/registrate', upload.single('photo'), urlencodedParser, makeUser);
app.post('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
    console.log("Uitgelogd!")
});
app.post('/profile', editProfile);
app.get('*', function(req, res) {
    res.render('404error');
});

function editProfile (req, res) {
    const query = {  _id : ObjectID(req.session.userId)};
    console.log(req.session.userId)
    // console.log(data)
        const updatedValues = {
                $set: {
                 'firstName' : req.body.firstName,
                 'gender' : req.body.gender,
                 'searchSex' : req.body.searchSex,
                 'age' : req.body.age,
                 'hometown' : req.body.hometown,
                 'email' : req.body.email,
                 'password' : req.body.password,
                 'photo' : req.body.photo
        }
    }
    console.log(updatedValues);
    db.collection('users')
        .findOneAndUpdate(query, updatedValues)
        .then(data => {
           console.log('heeft data gevonden');
           console.log(query);
           console.log(data);
             if (data){
                //  console.log(data)
                 res.redirect('/profile');
            }
        })
        .catch(err =>{
            console.log(err)
    })
}


function login (req, res){
    db.collection('users')
        .findOne({
            firstName: req.body.firstName,
            password: req.body.password
    })
    .then(data=> {
            console.log('Ingelogd als ' + data.firstName);
            req.session.userId = data._id;
            if (data){
                res.redirect('/profile');
        }
    })
    .catch(err=>{
        console.log(err);
        res.redirect('404error');
    });
}

// Register and the app makes an user in the DB
function makeUser(req, res) {
    let firstName = req.body.firstName;
    let gender = req.body.gender;
    let searchSex = req.body.searchSex;
    let age = req.body.age;
    let hometown = req.body.hometown;
    let email = req.body.email;
    let password = req.body.password;
    let photo = req.body.photo;

    const data = {
        'firstName' : firstName,
        'gender' : gender,
        'searchSex' : searchSex,
        'age' : age,
        'hometown' : hometown,
        'email' : email,
        'password' : password,
        'photo' : photo
    };

    db.collection('users').insertOne(data, function(err, collection){
        if (err){
            throw err;
        } else {
            console.log('User added');
            console.log(data);
            res.redirect('/registreer_p4');
        }
    });
}

// Server is listening on port:
app.listen(port, () => console.log('listening on port ' + port));