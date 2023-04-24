var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.get("/", (req,res,next)=> {
    var loginemail = req.cookies.user_email;
    var query = "select course.id,course.name,course.description, course.requirement, course.price, language.name as language, category.name as category  from course, category, language where user_id = (select id from user where email='"+loginemail+"') and course.category_id = category.id and course.language_id = language.id";
    connect.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render('courselist', {title: 'course list', courseList: result});
    })
})



module.exports = router;