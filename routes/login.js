var express = require('express');
var router = express.Router();
var connect = require('../database');
const parser = require("body-parser");
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.post("/", (req,res,next)=> {
    const email = req.body.login_email;
    const password = req.body.login_password;
    const type= req.body.type;
    var query = "SELECT count(*) as num FROM user where email='" +email+"' and password='"+ password+"' and type='"+ type +"'"; 
    connect.query(query,function(err,result,fields){
        if(err) throw err;
        if(result[0].num == 1){
            res.cookie('user_email',email);
            if(type== "instructor"){
            res.cookie('user_email',email);
            res.redirect("/homepage.html");
           
            console.log("1 row found");
        }
        else {
            res.redirect('./studenthomepage');
        }
     }

        else{
            res.redirect("./login.html");
            console.log("Zero or more than 1 row found");
        }
    })
    });

module.exports = router;