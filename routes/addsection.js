var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursename;
    
        res.render('addsection', {title: 'add course section', sampleData: coursename })
    });
       //next();
        //res.send("<h1>"+result+"</h1>");

router.post('/',(req,res,next)=>{
   var sectionname = req.body.sectionname;
   var coursename = req.cookies.coursename;
    var query2 = "insert into section (name,course_name) values ('"+sectionname+"',(Select id from course where course.name='"+coursename+"'))";
    connect.query(query2,(err,result)=>{
        if(err) throw err;
        console.log('1 section inserted');
        res.redirect('managecoursedetails');
    })
})

module.exports = router;