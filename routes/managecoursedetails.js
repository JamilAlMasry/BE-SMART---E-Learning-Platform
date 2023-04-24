var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursename;
    res.render('managecoursedetails', {CourseName: coursename});

    
    });
    
module.exports = router;