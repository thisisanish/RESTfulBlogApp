var express = require("express"),
    app=express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/restful_blog_app")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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
app.get("/", function(req, res){
    res.redirect("/blogs")
})

app.get("/blogs", function (req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs}) 
        }
    })
})
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs")
        }
    })
})

//NEW
app.get("/blogs/new", function(req, res){
    res.render("new")
})

//Show
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log("ERROR");
            
        }else{
            res.render("show", {blog: foundBlog})
        }
    })
})

//Edit

app.get("/blogs/:id/edit", function(req, res){
    res.render("edit")
})





app.listen(3000, function(){
    console.log("running on 3000")
})