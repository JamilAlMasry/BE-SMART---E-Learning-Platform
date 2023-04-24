var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursecategoryname;
    var username = req.cookies.user_email;
    var query = "select course.id,course.name,course.description, course.requirement, course.price, language.name as language,category.name as category  from course, category, language  where course.name='"+coursename+"' and course.category_id = category.id and course.language_id = language.id "
    var query1 = "select count(*) as count from enroll where enroll.course_id = (SELECT id from course where course.name='"+coursename+"') and enroll.user_id= (select id from user where user.email='"+username+"')";
    var query2 = "select count(*) as certificate from quizresult where quizresult.course_id = (SELECT id from course where course.name='"+coursename+"') and quizresult.user_id= (select id from user where user.email='"+username+"')";
   
    connect.query(query1,(err,result1)=>{
        if(err) throw err;
        console.log("The count is "+ result1[0].count);
        thecount = result1[0].count;
       res.cookie('enrollcount', thecount);
    });
    connect.query(query2,(err,result2)=>{
        if(err) throw err;
        //console.log("The count is "+ result1[0].count);
        certified = result2[0].certificate;
       res.cookie('certified', certified);
    });
    connect.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result);
       
       res.render('coursedetails', { data: result});
    });
   
       
    })

    router.post('/',(req,res,next)=>{
       var coursename = req.cookies.coursecategoryname;
       var enrollmenttype = req.body.enroll;
       var username = req.cookies.user_email;
       var date = new Date();
        var query2 = "insert into enroll(date,course_id,user_id, enrolltype) values ('"+date+"',(select id from course where course.name='"+coursename+"'),(select id from user where user.email='"+username+"'), (select id from enrolltype where enrolltype.name='"+enrollmenttype+"'))";
        connect.query(query2,(err,result)=>{
            if(err) throw err;
            console.log('1 enrollment inserted');
            if(enrollmenttype == 'paid'){
                res.redirect('coursepay');
            }
            else {
            res.redirect('studenthomepage'); }
        })
    })

    module.exports = router;
     