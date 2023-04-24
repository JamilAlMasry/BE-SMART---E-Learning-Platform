var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", (req,res,next)=> {
    var usersemail = req.cookies.user_email;
    
    var query = "SELECT * from category";
    connect.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result);
       
       res.render('allcategories', { data: result});
    });
       
    })
    module.exports = router;
     