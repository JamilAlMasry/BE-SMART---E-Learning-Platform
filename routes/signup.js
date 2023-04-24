var express = require('express');
var router = express.Router();
var connect = require('../database');

router.post("/", (req,res,next)=> {
    if(req.body.signup_password === req.body.signup_confirm_password){
 var query = "INSERT INTO user (firstname,lastname,email,password,type) VALUES ('"+ req.body.first_name+"','"+ req.body.last_name+"','"+req.body.signup_email+"','"+req.body.signup_password+"','"+req.body.type+"')";
connect.query(query, function(err,result){
    if(err) throw err;
    console.log("1 record inserted");
    res.redirect("/login.html");
})
    }
else {
 res.redirect("/signup.html");
}

})

module.exports = router;