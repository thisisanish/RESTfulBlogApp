var express = require("express"),
    router = express.Router(),
    passport = require("passport");
var User = require("../models/user.js");

// Root
router.get("/", function(req, res){
    res.redirect("/blogs")
})


// Auth routes
router.get("/register", function(req, res){
    res.render("register")
})

router.post("/register", function(req, res){
    //newUser is an object with everything but password which is later hashed
    var newUser = new User({username: req.body.username})
    // User.register registers a new user, and saves its details except password in database. req.body.password goes as other parameter where it probably gets hashed and salted so as to maintain security
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            console.log(err);
            
            return res.render("register")
        }else{
            // passport.authenticate !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome " + user.username)
                res.redirect("/blogs");
            })
        }
    })
})


// Login 
router.get("/login", function(req, res){
    res.render("login")
})

router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/blogs",
        failureRedirect:"/login"
    }),function(req, res){
        
})

//Logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been successfully logged out")
    res.redirect("/blogs")
})

module.exports = router