var express = require("express");
var router = express.Router();
var Blog = require("../models/blogs.js");
var middleware = require("../middleware/")
flash = require("connect-flash");
console.log("reached");

// Index

router.get("/", function (req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            req.flash("info", "heyy there")
            res.render("blogs/index", {blogs: blogs}) 
        }
    })
    console.log("reached");
    
});


//NEW

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blogs/new")
})


// Create

router.post("/",middleware.isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    var title = req.body.blog.title;
    var image = req.body.blog.image;
    var body = req.body.blog.body;
    var author = {
        id: req.user._id,
        username:req.user.username
    }


    var newblogpost = {title: title, image: image, body: body, author: author}
    console.log(newblogpost);
    console.log(req.body.blog);
    

    
    Blog.create(newblogpost, function(err, newBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs")
        }
    })
})


//Show

router.get("/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
            
        }else{
            res.render("blogs/show", {blog: foundBlog})
        }
    })
})

//Edit

router.get("/:id/edit", middleware.checkPostingOwnership, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("blogs/edit", {blog: foundBlog})
        }
    })
})

// Update

router.put("/:id",middleware.checkPostingOwnership, function(req, res){
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

router.delete("/:id",middleware.checkPostingOwnership, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }
    })
})

module.exports = router