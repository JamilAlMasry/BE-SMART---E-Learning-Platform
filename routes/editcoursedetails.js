var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.get("/", (req,res,next)=> {
    var thecoursename = req.cookies.coursename;
    console.log(thecoursename);
    var query = "Select * from category";
    var query1 = "Select * from language";
    var query2 = "select course.id ,course.name, course.description, course.requirement, course.price, language.name as language, category.name as category from course, language, category where course.name = '"+thecoursename+"' and course.category_id = category.id and course.language_id = language.id";
   connect.query(query,(err,result)=> {
        if(err) throw err;
        console.log("Nothing");
        console.log(result);
    connect.query(query1, (err,result1)=> {
        if(err) throw err;
        console.log(result1);
    connect.query(query2, (err,result2)=>{
        console.log(result2);
        res.render('editcoursedetails', {title: 'coursedetails', category: result, language: result1, details: result2 });
    })
    })   
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
    var courseid = req.body.courseid;
   // var instructoremail = req.body.instructoremail;
    var query2 = "update course set course.name='"+coursename+"',course.description='"+coursedescription+"',course.requirement='"+coursereq+"',course.price='"+courseprice+"',course.category_id='"+coursecategory+"',course.language_id='"+courselanguage+"' where course.id="+courseid+"";
    connect.query(query2,(err,result)=>{
        if(err) throw err;
        console.log('1 course updated');
        res.redirect('/homepage.html');
    })
})

module.exports = router;