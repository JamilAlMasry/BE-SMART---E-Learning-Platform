var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursecategoryname;
    var useremail = req.cookies.user_email;
    var query = "select date from quizresult where course_id=(select id from course where course.name='"+coursename+"') and user_id=(select id from user where user.email='"+useremail+"')";
    var query1 = "select firstname, lastname , course.id, course.user_id from user, course where course.user_id = user.id and course.name='"+coursename+"'";
    var query2 = "select firstname,lastname from user where user.email='"+useremail+"'";
    connect.query(query,(err,results)=>{
        console.log(results);
        connect.query(query1,(err,result1)=>{
            console.log(result1);
            connect.query(query2,(err,result2)=>{
                console.log(result2);
                res.render('coursecertificate', {title: 'course certificate', date: results, coursename: coursename, instructorname: result1, username:result2 });
            })
        })
    })
   
   
    
    });
       //next();
        //res.send("<h1>"+result+"</h1>");
       
       

module.exports = router;