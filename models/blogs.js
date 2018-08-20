// Schema
var mongoose = require("mongoose")

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});
module.exports = mongoose.model("Blog", blogSchema);


// Blog.create({
//     title: "Test Blog",
//     image: "https://www.revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic.png",
//     body: "bodybodybodybodybodybodybodybodybodybodybody"
// });

