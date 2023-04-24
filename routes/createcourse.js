var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.get("/", (req,res,next)=> {
    var loginemail = req.cookies.user_email;
    console.log(loginemail);
    var query = "Select * from category";
    var query1 = "Select * from language";
   connect.query(query,(err,result)=> {
        if(err) throw err;
        console.log("Nothing");
        console.log(result);
    connect.query(query1, (err,result1)=> {
        if(err) throw err;
        console.log(result1);
        res.render('createcourse', {title: 'course category', sampleData: result, language: result1, email: loginemail })
    })    ;
       //next();
        //res.send("<h1>"+result+"</h1>");
        
        
    });
    
})

router.post('/',(req,res,next)=>{
    var coursename = req.body.coursename;
    var coursedescription = req.body.coursedescription;
    var coursereq = req.body.coursereq;
    var courseprice = req.body.courseprice;
    var coursecategory = req.body.coursecategory;
    var courselanguage = req.body.courselanguage;
    var instructoremail = req.body.instructoremail;
    var query2 = "insert into course (name,description,requirement,price,category_id,language_id,user_id) values ('"+coursename+"','"+coursedescription+"','"+coursereq+"','"+courseprice+"','"+coursecategory+"','"+courselanguage+"',(select id from user where email='"+instructoremail+"'))";
    connect.query(query2,(err,result)=>{
        if(err) throw err;
        console.log('1 course inserted');
        res.redirect('/homepage.html');
    })
})

module.exports = router;