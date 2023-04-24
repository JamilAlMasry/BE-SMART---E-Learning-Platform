var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursename;
    
        res.render('addcoursequiz', {title: 'add course quiz', sampleData: coursename })
    });
       //next();
        //res.send("<h1>"+result+"</h1>");

router.post('/',(req,res,next)=>{
    var questionname = req.body.questionname;
    var correctanswer = req.body.correctanswer;
    var onewronganswer = req.body.onewronganswer;
    var twowronganswer = req.body.twowronganswer;
    var threewronganswer = req.body.threewronganswer;
   var coursename = req.cookies.coursename;
    var query = "insert into coursequestions (name,choiceone,choicetwo,choicethree,choicefour,course_id) values ('"+questionname+"','"+correctanswer+"','"+onewronganswer+"','"+twowronganswer+"','"+threewronganswer+"',(Select id from course where course.name='"+coursename+"')) ";
  // var query1 = "insert into questionchoice (name,question_id) values ('"+correctanswer+"',(Select id from coursequestions where coursequestions.name='"+questionname+"'))"
//var query2 = "insert into questionchoice (name,question_id) values ('"+onewronganswer+"',(Select id from coursequestions where coursequestions.name='"+questionname+"'))"
   //var query3 = "insert into questionchoice (name,question_id) values ('"+twowronganswer+"',(Select id from coursequestions where coursequestions.name='"+questionname+"'))"
   //var query4 = "insert into questionchoice (name,question_id) values ('"+threewronganswer+"',(Select id from coursequestions where coursequestions.name='"+questionname+"'))"
   
   var query5 = "insert into questionanswer (name,question_id, course_id) values ('"+correctanswer+"',(Select id from coursequestions where coursequestions.name='"+questionname+"'),(Select id from course where course.name='"+coursename+"'))"
   connect.query(query,(err,result)=>{
        if(err) throw err;
        console.log('1 question inserted');
       // res.redirect('managecoursedetails');
    })
 /*   connect.query(query1,(err,result)=>{
        if(err) throw err;
        console.log('1 choice inserted');
       // res.redirect('managecoursedetails');
    })
    connect.query(query2,(err,result)=>{
        if(err) throw err;
        console.log('1 choice inserted');
       // res.redirect('managecoursedetails');
    })
    connect.query(query3,(err,result)=>{
        if(err) throw err;
        console.log('1 choice inserted');
       // res.redirect('managecoursedetails');
    })
    connect.query(query4,(err,result)=>{
        if(err) throw err;
        console.log('1 choice inserted');
       // res.redirect('managecoursedetails');
    }) */
    connect.query(query5,(err,result)=>{
        if(err) throw err;
        console.log('1 answer inserted');
       // res.redirect('managecoursedetails');
    })
    res.redirect('managecoursedetails');

})

module.exports = router;