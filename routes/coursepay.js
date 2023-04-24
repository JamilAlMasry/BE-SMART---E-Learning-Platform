var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursecategoryname;
    var useremail = req.cookies.user_email;
    var query = "select firstname, lastname from user where user.email='"+useremail+"'";
    var query1 = "select * from course where course.name='"+coursename+"'";
   
    connect.query(query,(err,result1)=>{
        if(err) throw err;
        console.log(result1);
       connect.query(query1,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render('coursepay', { data: result, userdata: result1});  
       })
       
    });
   
    })

    router.post('/',(req,res,next)=>{
        var coursename=req.cookies.coursecategoryname;
        var useremail = req.cookies.user_email;
        var userenteredemail = req.body.email;
        var creditcard = req.body.creditcardnumber;
        var cvv = req.body.cvvcode;
        var date = new Date();
        var query2 = "insert into enrollpay (date,price,creditcard,cvv,course_id,user_id,enroll_id) values ('"+date+"', (select price from course where course.name='"+coursename+"'), '"+creditcard+"','"+cvv+"',(select id from course where course.name='"+coursename+"'),(select id from user where user.email='"+useremail+"'),(select id from enroll where enroll.course_id=(select id from course where course.name='"+coursename+"') and enroll.user_id=(select id from user where user.email='"+useremail+"')))";
        if(useremail == userenteredemail){
        connect.query(query2,(err,result)=>{
            if(err) throw err;
            console.log('1 payment inserted');
            res.redirect('/coursedetails'); })
        } else {
            console.log("Not the same email");
        }
        })
    
    module.exports = router;
     