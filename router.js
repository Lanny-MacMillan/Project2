var express = require('express')
var router = express.Router();
const Amiibo = require('./models/schema.js')
const credential = {
    email: "admin@gmail.com",
    password: "admin123",
}


//Login Route
router.post('/login',(req,res) => {
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        
        res.redirect('/index')
        // res.end('Login Successful...!')
    } else {
        res.end("Invalid Username/Password")
    }
})

 //route to logout
router.get('/logout', (req,res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        } else {
            res.render('base', {title: "Express", logout: "logout successful!"})
        }
    })
})
module.exports = router