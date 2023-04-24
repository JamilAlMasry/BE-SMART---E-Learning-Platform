var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursecategoryname;
    var username = req.cookies.user_email;
    var query = "select * from section where section.course_name=(select id from course where course.name='"+coursename+"')";
    var query1 = "select count(*) as count from enrollpay where enrollpay.course_id = (SELECT id from course where course.name='"+coursename+"') and enrollpay.user_id= (select id from user where user.email='"+username+"')";
    var query2 = "select count(*) as certificate from quizresult where quizresult.course_id = (SELECT id from course where course.name='"+coursename+"') and quizresult.user_id= (select id from user where user.email='"+username+"')";
    connect.query(query2,(err,result2)=>{
        if(err) throw err;
        //console.log("The count is "+ result1[0].count);
        //certified = result2[0].certificate;
      // res.cookie('certified', certified);
    });
    connect.query(query1,(err,result1)=>{
        if(err) throw err;
        console.log("The count is "+ result1[0].count);
        thecount = result1[0].count;
       res.cookie('paycount', thecount);
    });
    connect.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result);
       
       res.render('coursesection', { data: result});
    });
       
    })
    module.exports = router;
     