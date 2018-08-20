var express = require("express"),
    app=express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStratergy = require("passport-local"),
    User = require("./models/user.js"),
    flash = require("connect-flash");

var blogsRoutes = require("./routes/blogs.js"),
    indexRoutes = require("./routes/index");


    


// mongoose.connect("mongodb://localhost/restful_blog_app")
mongoose.connect("mongodb://anish:password1@ds125472.mlab.com:25472/blogapp-proto")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "Pugs are awesome!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate())) // remember when we use "local"
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());



app.use(function(req, res, next){
    res.locals.currentUser = req.user; // whatever is with res.locals will be available to the templates
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next(); // important
})

app.use("/", indexRoutes)
app.use("/blogs", blogsRoutes)



app.set( 'port', ( process.env.PORT || 3000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });