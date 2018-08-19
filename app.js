var express = require("express"),
    app=express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser");
    


mongoose.connect("mongodb://localhost/restful_blog_app")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Schema

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://www.revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic.png",
//     body: "bodybodybodybodybodybodybodybodybodybodybody"
// });


// Root
app.get("/", function(req, res){
    res.redirect("/blogs")
})

// Index

app.get("/blogs", function (req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs}) 
        }
    })
})


//NEW

app.get("/blogs/new", function(req, res){
    res.render("new")
})


// Create

app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs")
        }
    })
})


//Show

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
            
        }else{
            res.render("show", {blog: foundBlog})
        }
    })
})

//Edit

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("edit", {blog: foundBlog})
        }
    })
})

// Update

app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs/" + req.params.id)
        }
    })
})

// Delete

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }
    })
})

// Listening 
app.listen(3000, function(){
    console.log("running on 3000")
})