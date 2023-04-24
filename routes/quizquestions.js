var express = require('express');
var router = express.Router();
var connect = require('../database');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
var question = [];
router.get("/", (req,res,next)=> {
    var coursename = req.cookies.coursecategoryname;
    var query = "select * from coursequestions where coursequestions.course_id=(select id from course where course.name='"+coursename+"')";
    for(var i=0;i<5;i++){
        console.log('question'+i);
    }
    connect.query(query,(err,result)=>{
        console.log(result);
        res.render('quizquestions', {title: 'add course quiz', sampleData: coursename, question: result })
    })

    });
       //next();
        //res.send("<h1>"+result+"</h1>");
        var questionsnumber;
        var resultnumber;
        router.post('/',(req,res,next)=>{
                
                 var coursename = req.cookies.coursecategoryname;
                 var useremail = req.cookies.user_email;
                 var query = "select * from questionanswer where course_id = (select id from course where course.name='"+coursename+"')";
                 var query1 = "select count(*) as number from coursequestions where coursequestions.course_id=(select id from course where course.name='"+coursename+"')"
                 connect.query(query1,(err,result1)=>{
                    if(err) throw err;
                    
                    questionsnumber = result1[0].number
                    console.log(questionsnumber);

                 })
                 var query2 = "select count(*) as num from quizresult where quizresult.course_id=(select id from course where course.name='"+coursename+"') and quizresult.user_id=(select id from user where user.email='"+useremail+"')";
             
                 connect.query(query2,(err,result2)=>{
                    if(err) throw err;
                    resultnumber = result2[0].num;

                 })
                 var total = 0;
                 
                 
                 connect.query(query, (err,result)=>{
                    if(err) throw err;
                    console.log(result);
                    
            
                    for(var i=0;i<questionsnumber;i++){
                     var q = 'question'+i;
                     question[i] = req.body[q];
                     console.log(question[i]);
                    }
                    for(var i=0;i<questionsnumber;i++){
                     if(question[i] == result[i].name){
                         total += (100/questionsnumber);
                     }
                     else {
                         continue;
                     }
                    }
                    console.log(total);
                    var date = new Date();
                    var query5 = "update quizresult set result='"+total+"' where course_id=(select id from course where course.name='"+coursename+"') and user_id=(select id from user where user.email='"+useremail+"')";
                    
                    var query4 = "insert into quizresult (date,result,course_id,user_id) values ('"+date+"','"+total+"',(select id from course where course.name='"+coursename+"'), (select id from user where user.email='"+useremail+"'))";
                   if(resultnumber == 0){
                    connect.query(query4,(err,result)=>{
                        if(err) throw err;
                       
                       })
                   }
                   else {
                    connect.query(query5,(err,result)=>{
                        if(err) throw err;
                       
                    })
                   }
                   
                  res.redirect('/coursecertificate');
                    
                 })    
                 

        })
        


module.exports = router;