var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", (req,res,next)=> {
    var categoryname = req.cookies.categoryname;
    
    var query = "select course.id,course.name,course.description, course.requirement, course.price, language.name as language,category.name as category  from course, category, language where course.category_id = (select id from category where name='"+categoryname+"') and course.category_id = category.id and course.language_id = language.id "
    
    connect.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result);
       
       res.render('coursecategory', { data: result});
    });
       
    })
    module.exports = router;
     