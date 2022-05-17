// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Amiibo = require('./models/schema.js')
const User = require('./models/users.js')




const bodyparser = require('body-parser')
const session = require('express-session')

const{v4:uuidv4} = require('uuid') //password encryption
const router = require('./router');



app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));

app.use(session({
    secret: uuidv4(),
    resave:false,
    saveUninitialized: true,
}))

app.use('/route', router)

//body parser, parses form 
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// use public folder for css
app.use(express.static('public'))

// // For login stuff
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

// =======================================
//              DATABASE
// =======================================
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
    console.log('connected to mongo')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// function validate(){
//     var pass1 = document.getElementById('name').value;
//     var pass2 = document.getElementById('img').value;
//     var pass3 = document.getElementById('series').value;
//     var pass4 = document.getElementById('description').value;
//     var pass5 = document.getElementById('condition').value;
//     var pass6 = document.getElementById('price').value;
//     var pass7 = document.getElementById('purchasedFrom').value;
//     if(pass1 == ""){
//         alert('name field cannot be empty')
//         return false
//     }
//     if(pass2 == ""){
//         alert('img field cannot be empty')
//         return false
//     }
//     if(pass3 == ""){
//         alert('series field cannot be empty')
//         return false
//     }
//     if(pass4 == ""){
//         alert('description field cannot be empty')
//         return false
//     }
//     if(pass5 == ""){
//         alert('condition field cannot be empty')
//         return false
//     }
//     if(pass6 == ""){
//         alert('price field cannot be empty')
//         return false
//     }
//     if(pass7 == ""){
//         alert('purchased field from cannot be empty')
//         return false
//     }
//     return true
// }



// =======================================
//              MIDDLEWARE
// =======================================
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.set('view engine', 'ejs');
// =======================================
//              ROUTES
// =======================================
// app.get('/',(req, res) => {
//     res.redirect('/login')
// })

app.get('/', (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/login')
    } else {
        res.redirect('/index')
    }
})

// LOGIN reroute
app.get('/login', (req, res) => {
    res.render('base',{title:"Login System"});
})

app.get('/dashboard',(req, res) => {
    res.redirect('/index')
})



// INDEX
app.get('/index', (req, res) => {
    Amiibo.find({}, (error, allAmiibo) => {
    res.render(
        'index.ejs', 
            {
            amiibo: allAmiibo
            }
        )
    })
})

// NEWS
app.get('/news', (req, res) => {
    Amiibo.find({}, (error, allAmiibo) => {
    res.render(
        'news.ejs', 
            {
            amiibo: allAmiibo
            }
        )
    })
})

// NEW/GET
app.get('/new', (req, res) => {
    res.render(
        'new.ejs', 
        )
})

// SHOW
app.get('/:id', (req, res) => {
    Amiibo.findById(req.params.id, (error, showAmiibo) => {
        res.render(
            'show.ejs',
            {
            amiibo: showAmiibo
            }
        );
    })
})
// =========================== API =====================================

// app.get('/api/amiibo/', (req, res) => {
//     Amiibo.findById(req.params.id, (error, showAmiibo) => {
//         res.render(
//             'api.ejs',
//             {
//             Amiibo: showAmiibo
//             }
//         );
//     })
// })

// =========================== API =====================================

//SHOW MODAL
app.get('/delete/:id', (req, res) => {
    Amiibo.findById(req.params.id, (error, oneAmiibo) => {
        res.render(
        'delete.ejs', 
            {
            Amiibo: oneAmiibo
            }
        )
    })
})

// NEW/POST
app.post('/', (req,res) => {
	Amiibo.create(req.body, (err, newAmiibo) => {
		res.redirect('/')
	})
})

// EDIT/GET
app.get('/:id/edit', (req, res) => {
	Amiibo.findById(req.params.id, (err, editAmiibo) => {
		res.render(
			'edit.ejs', {
				Amiibo: editAmiibo
			}
		)
	})
})
// EDIT/POST
app.put('/:id', (req, res) => {
    Amiibo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAmiibo) => {
        res.redirect('/')
    })
})

// DELETE
app.delete('/:id', (req, res)=>{
    Amiibo.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/');//redirect back to index
    });
});
// =======================================
//              Listener
// =======================================
app.listen(PORT, () => console.log( 'Listening on port:', PORT));


