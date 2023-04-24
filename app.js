var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connect = require('./database');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var createcourseRouter = require('./routes/createcourse');
var courselistRouter = require('./routes/courselist');
var managecoursedetailsRouter = require('./routes/managecoursedetails');
var editcoursedetailsRouter = require('./routes/editcoursedetails');
var addsectionRouter = require("./routes/addsection");
var edituserinformationRouter = require('./routes/edituserinformation');
var edituserpasswordRouter = require('./routes/edituserpassword');
var studenthomepageRouter = require('./routes/studenthomepage');
var allcategoriesRouter = require('./routes/allcategories');
var coursecategoryRouter = require('./routes/coursecategory');
var coursedetailsRouter = require('./routes/coursedetails');
var coursesectionRouter = require('./routes/coursesection');
var coursepayRouter = require('./routes/coursepay');
var addcoursequizRouter = require('./routes/addcoursequiz');
var quizquestionsRouter = require('./routes/quizquestions');
var coursecertificateRouter = require('./routes/coursecertificate');
//var courserouter = require('./routes/course');
var app = express();
//app.use(express.static('public'));
// view engine setup
app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'));

// Path to our public directory

//app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/addsection', addsectionRouter );
app.use('/addcoursesection', addsectionRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/', indexRouter);
app.use('/createcourse', createcourseRouter);
app.use('/instructorcreatecourse', createcourseRouter);
app.use('/users', usersRouter);
app.use('/courselist', courselistRouter);
app.use('/managecoursedetails', managecoursedetailsRouter);
app.use('/editcoursedetails', editcoursedetailsRouter);
app.use('/instructormodifycourse', editcoursedetailsRouter);
app.use('/editusersinformation', edituserinformationRouter);
app.use('/edituserinformation', edituserinformationRouter);
app.use('/edituserpassword', edituserpasswordRouter);
app.use('/edituserspassword', edituserpasswordRouter);
app.use('/studenthomepage', studenthomepageRouter);
app.use('/allcategories', allcategoriesRouter);
app.use('/coursecategory', coursecategoryRouter);
app.use('/coursedetails', coursedetailsRouter);
app.use('/enrollcourse', coursedetailsRouter);
app.use('/coursesection', coursesectionRouter);
app.use('/coursepay', coursepayRouter);
app.use('/addpay', coursepayRouter);
app.use('/addcoursequiz',addcoursequizRouter);
app.use('/addcoursequizquestion', addcoursequizRouter);
app.use('/quizquestions', quizquestionsRouter);
app.use('/submitquiz', quizquestionsRouter);
app.use('/coursecertificate', coursecertificateRouter);
app.get("/login.html", (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/login.html'))
})
app.get("/signup.html", (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/signup.html'))
})
app.get("/homepage.html", (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/homepage.html'))
})
app.get('/createcourse', (req,res)=> {
  res.sendFile(path.resolve(__dirname, '../views/createcourse.html'));
})
app.get('/company-info', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/companyinfo.html'));
})
app.get('/courselist', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/courselist.html'));
})
app.get('/managecoursedetails', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/managecoursedetails.html'));
})
app.get('/editcoursedetails', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/editcoursedetails.html'));
})
app.get('/addsection', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/addsection.html'));
})
app.get('/edituserinformation', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/edituserinformation.html'));
})
app.get('/edituserpassword', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/edituserpassword.html'));
})
app.get('/studenthomepage', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/studenthomepage.html'));
})
app.get('/allcategories', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/allcategories.html'));
})
app.get('/coursecategory', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/coursecategory.html'));
})
app.get('/coursedetails', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/coursedetails.html'));
})
app.get('/coursesection', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/coursesection.html'));
})
app.get('/coursepay', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/coursepay.html'));
})
app.get('/addcoursequiz', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/addcoursequiz.html'));
})
app.get('/quizquestions', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/quizquestions.html'));
})
app.get('/coursecertificate', (req,res)=> {
  res.sendFile(path.resolve(__dirname, './views/coursecertificate.html'));
})
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */
app.listen(3000, ()=> {
    console.log("Localhost:3000");
})
module.exports = app;
