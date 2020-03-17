//import express packages
const cc = require ('camelcase');
const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const find = require('array-find');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const mongoose = require ('mongoose');
// const multer= require('multer');
const mongo = require ('mongodb');
const session = require ('express-session');
let usersMultiple;

// Database MongoDB
require('dotenv').config()      

let db = null;
const uri = process.env.DB_URI

mongo.MongoClient.connect(uri, function (err, client) {
  if (err) {
    throw err
  }

  db = client.db(process.env.DB_NAME)
  usersMultiple = db.collection(process.env.DB_NAME);
  usersMultiple.createIndex({ username: 1 }, {unique: true});
});


// const users = [];

// Middelware set-up:
// Using static files from static directory:
app.use('/static', express.static('static'));

//Locate ejs(templating) (and views) 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routing 
app.get('/', function(req, res) {res.render('index.ejs')});
app.get('/registreer_p1', function(req, res) {res.render('registreer_p1.ejs')});
app.get('/registreer_p2', function(req, res) {res.render('registreer_p2.ejs')});
app.get('/registreer_p3', function(req, res) {res.render('registreer_p3.ejs')});
app.get('/registreer_p4', function(req, res) {res.render('registreer_p4.ejs')});
// app.post('/test.ejs', addInlog);
app.get('/test', gettingData);
app.post('/', login)

// getting data from database
function gettingData(req, res, next){
    db.collection('users').find().toArray(done)
        
    function done (err, data){
        if (err){
            next(err)
        } else{
            console.log(data);
            res.render('test.ejs', {users: data})
        }
    }
}


function addInlog(req, res, next){
    db.collection('users').insertOne({
        username: req.body.username,
        password: req.body.password
    }, done)

    function done (err, data){
        if (err){
            console.log('You have got an error!')
            next(err)
        } else{
            console.log('Succeeded')
            res.render('/', {data: data})
        }
    }
}

// check if there is an user and also logs in
function login (req, res){


    usersMultiple.find({}, { projection: { _id: 0, wachtwoord: 0 } }).toArray(function(err, collection) {
        if (err) throw err;
        const gebruiker = collection.find(collection => collection.username === req.body.username && collection.password === req.body.password);
        if (gebruiker === undefined) {
            console.log('Account not found :(');
        } else {
            console.log(gebruiker);
            console.log('Account found :) !');
            console.log(id)
            res.render('succes.ejs');
        }
    });
}


// wachtwoord vergeten--> nieuwe instellen
// db.collection('users').updateOne({ id: 1 } { $Set { password: req.body.password } })





// function addInput(req, res){
//     username: req.body.username,
//     password: req.body.password
// }

// function aanmeld(req, res, next){
//     db.collection('users').insertOne({
//         name: req.body.username,
//         password: req.body.password,
//     }, done
//     )

//     function done(err, data){
//         if (err){
//             next (err)
//         } else{
//             res.redirect('/' + data.insertedId)
//             console.log('gelukt!')
//         }
//     }
     

// }


// --------------------------------------------------------------------------------------------------------------------------


app.use(urlencodedParser);

// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET
// }))

// app.get('/log-out', logout);



// get the id
// app.get('/:id', movie)

// Render a page)
// app.get('/', moviesFunction);

// app.get('/test', test);

// Render a form
// app.get('/add', form); 

// Getting home.html file:
// app.get('/home', (req, res) => res.send('De Homepage'));

// Getting about.html file:
app.get('/about', (req, res) => res.send('De About-page'));

// Getting 404.html file:
app.get('*', (req, res) => res.send('De Error 404 pagina'));

// Posting an new movie and added to the object.ejs (list)
// app.post('/detail', urlencodedParser, add);

// app.delete('/:id', remove)

// app.update('/detail', edit)

// app.get('test.ejs', movie)
// app.get('/:id', renderData)

function test(req, res) {
    db.collection('account').find().toArray(done)

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            console.log(data);
            res.render('test.ejs', {data: data});
        }
    }
}

// Functions 

function logout(req, res, next){
    req.session.destroy(function (err){
        if (err){
            next (err)
        } else{
            res.redirect('/')
        }
    })
}





function add(req, res, next){
    db.collection('movies').insertOne({
        title: req.body.title,
        plot: req.body.plot,
        description: req.body.description
    }, done
    )

    function done(err, data){
        if (err){
            next (err)
        } else{
            res.redirect('/' + data.insertedId)
            console.log('gelukt!')
        }
    }
     

}

function renderData(req, res) {
    let insertedId = req.params.id
    db.collection('movies').findOne({
        _id: new mongo.ObjectID(id)
    }, done)

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render('detail.ejs', {data: data});
        }
    }
}



// function moviez(req,res){
//     res.render('object.ejs', {data: movies})
// }

function movie(req, res, next){
    var id = req.params.id
    db.collection('movies').findOne({
        _id: mongo.ObjectId
    }, done)

    function done(err, data){
        if (err){
            next (err)
        } else{
            res.render('detail.ejs', {data: data})
            console.log('ge-fined')
        }
   
    }
}




// Function form to render the data from add.ejs
function form (req, res)  {
 res.render('add.ejs')};

//function to edit data //doet het nog niet!!!!!!!!!!!!!!!!!!
// function edit(req,res){

// }

//function to delete data
function remove(req,res){ //doet het nog niet!!!!!!!!!!!!!!!!!!
    var id = req.params.id

    // db.collection('movies').deleteOne({
    //     _id: mongo.ObjectID(id)
    // }, done)

    // function done(err) {
    //     if (err){
    //         next(err)
    //     } else{
    //         res.json({status: 'ok'})
    //     }
    // }

    data = data.filter(function (value) {
        return value.id !== id
    })
    
    res.json({status: 'ok'})
}



function moviesFunction(req, res, next){
    db.collection('movies').find().toArray(done)

    function done(err, data){
        if (err){
            next(err)
        } else{
            res.render('object.ejs', {data: movies})
        }
    }

}





// Server is listening on port:
app.listen(port, () => console.log('listening on port ' + port));


console.log(cc('LEUKE-OPDRACHT'));
// console.log('The route parameters are ' );