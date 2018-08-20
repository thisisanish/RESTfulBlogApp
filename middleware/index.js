var Blog = require("../models/blogs")
middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "You need to be logged in to do that!") // wont be displayed unless new change
        res.redirect("/login")
    }
}
middlewareObj.checkPostingOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundpost){
            if(err){
                res.redirect("back")
                
            }else{
                console.log("yolo"+foundpost.author.id);
                console.log(req.user._id);
                
                
                if (foundpost.author.id.equals(req.user._id)){
                    next()
                }
                else{
                    req.flash("error", "You don't have permission :(")
                    res.redirect("back")
                }
            }
        })
    }else {
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }   
};

module.exports = middlewareObj