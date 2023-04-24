var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.get("/", (req,res,next)=> {
    var useremail = req.cookies.user_email;
    
    var query = "Select user.firstname, user.lastname, user.type from user where user.email='"+useremail+"'";
    connect.query(query,(err,result)=>{
        console.log(result);
        usertype = result[0].type;
        res.cookie('usertype', usertype);
        res.render('edituserinformation', {title: 'userdetails', data: result });
    })
       
    })
   
     

router.post('/',(req,res,next)=>{
   var useremail = req.cookies.user_email;
   var userfirstname = req.body.firstname;
   var userlastname = req.body.lastname;
    var query2 = "update user set user.firstname='"+userfirstname+"', user.lastname='"+userlastname+"' where user.email='"+useremail+"'";
    connect.query(query2,(err,result)=>{
        if(err) throw err;
        console.log('1 data edited');
        res.redirect('homepage.html');
    })
})

module.exports = router;