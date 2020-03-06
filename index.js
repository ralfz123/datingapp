//import express packages
const cc = require ('camelcase');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const slug = require('slug');
const bodyParser = require ('body-parser');
const find = require('array-find');

const movies = [ {
    id : 'catch-me-if-you-can',
    title : 'Catch me if you can',
    plot: 'A seasoned FBI agent pursues Frank Abagnale Jr. who, before his 19th birthday, successfully forged millions of dollars worth of checks while posing as a Pan Am pilot, a doctor, and a legal prosecutor. New Rochelle, the 1960s.' ,
    description : 'before his 19th birthday.',
},

{
    id : 'knives-out',
    title : 'Knives out',
    plot : 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    description : 'Writer Harlan Thrombey is found dead in his house, just after his 85th birthday. Detective Benoit Blanc is called in to solve the mystery, which is quite a challenge. Harlan has rather strange and suspicious family members and also a number of staff members who served him when he was alive.',
},

{
    id : 'batman',
    title : 'batman',
    plot : 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    description : 'Writer Harlan Thrombey is found dead in his house, just after his 85th birthday. Detective Benoit Blanc is called in to solve the mystery, which is quite a challenge. Harlan has rather strange and suspicious family members and also a number of staff members who served him when he was alive.',
}
]

//
app.get('/:id', movie)

//Locate ejs (and views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Using static directory:
app.use('/static', express.static('static'));

// Render a page
app.get('/', (req, res) => res.render('object.ejs', {data: movies}));

// Render a form
app.get('/add', form); 

// Getting home.html file:
app.get('/home', (req, res) => res.send('De Homepage'));

// Getting contact.html file:
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname + '/static/contact.html')));

//Getting an image
app.get('/foto', (req, res) => res.sendFile(path.join(__dirname + '/static/logo-techv2.png')));

//Getting an mp3 file
app.get('/mp3', (req, res) => res.sendFile(path.join(__dirname + '/static/Sabre_Dance_Aram_Khachaturian.mp3')));

// Getting about.html file:
app.get('/about', (req, res) => res.send('De About-page'));

// Getting 404.html file:
app.get('*', (req, res) => res.send('De Error 404 pagina'));


app.use(bodyParser.urlencoded({extended: true}));
app.post('/', add);



// Function form to render the data from add.ejs
function form (req, res)  {
    res.render('add.ejs')};


function add(req,res){
    var id = slug(req.body.title).toLowerCase()

    data.push({
        id: id,
        title: req.body.title,
        plot: req.body.plot,
        description: req.body.description
    })

    res.redirect('/' + id)
}


function moviez(req,res){
    res.render('object.ejs', {data: movies})
}

function movie(req, res, next){
    var id = req.params.id
    var movie = find(data, function (value){
        return value.id === id;
    })

    if (!movie){
        next()
        return
    }
    res.render('detail.ejs', {data: movie})
}

// Server is listening on port:
app.listen(port, () => console.log('listening on port ' + port));




console.log(cc('LEUKE-OPDRACHT'));
// console.log('The route parameters are ' );