//import express packages
const cc = require ('camelcase');
const nodemon = require ('nodemon');
const express = require ('express');
const app = express();
const port = 3000;
const path = require('path');
// const views = require ('views');

app.set('view engine', 'ejs');


// Using static directory:
app.use('/static', express.static('static'));

// Getting home.html file:
app.get('/home', (req, res) => res.send('De Homepage'));

// Getting contact.html file:
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname + '/static/contact.html')));

//Getting an image
app.get('/foto', (req, res) => res.sendFile(path.join(__dirname + '/static/logo-techv2.png')));

//Getting an mp3 file
app.get('/mp3', (req, res) => res.sendFile(path.join(__dirname + '/static/Sabre_Dance_Aram_Khachaturian.mp3')));


// query parameters exercise = ???
app.get('/users/:userId/books/:bookId', (req, res) => res.send(req.params));


// Getting about.html file:
app.get('/about', (req, res) => res.send('De About-page'));

// Getting 404.html file:
app.get('*', (req, res) => res.send('De Error 404 pagina'));


// Server is listening on port:
app.listen(port, () => console.log('listening on port ' + port));

//route to index.ejs
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})




console.log(cc('LEUKE-OPDRACHT'));
console.log('The route parameters are ' );



// console.log(camelCase('foo-bar'));