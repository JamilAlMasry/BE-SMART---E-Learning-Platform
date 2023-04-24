var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
var userpassword;
router.get("/", (req,res,next)=> {
    var usersemail = req.cookies.user_email;
    
    var query = "Select user.password , user.type from user where user.email='"+usersemail+"'";
    connect.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result[0].password);
        userpassword = result[0].password;
        usertype = result[0].type;
        console.log(userpassword);
     //   usertype = result1[0].type;
        res.cookie('usertype', usertype);
       res.render('edituserpassword', {title: "password", data: usertype});
    });
       
    })
   
     

router.post('/',(req,res,next)=>{
    var useremail = req.cookies.user_email;
   var oldpassword = req.body.oldpassword;
   var newpassword = req.body.newpassword;

   var newconfirmpassword = req.body.newconfirmpassword;
   console.log(oldpassword);
   if(oldpassword == userpassword && newpassword == newconfirmpassword){
    var query2 = "update user set password='"+newpassword+"' where user.email='"+useremail+"'";
    connect.query(query2,(err,result)=>{
        if(err) throw err;
        console.log('1 password edited');
        res.redirect('/homepage.html');
    })
   }
   else {
    console.log('Not the same');
    res.redirect('/edituserpassword');
   }
   
})

module.exports = router;