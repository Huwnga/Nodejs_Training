// Call library
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Call Controller
// const errorController = require('./services/error');

const app = express();

// Call routes
const signRoutes = require('./routes/sign');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');

// set views
app.set('view engine', 'ejs');
app.set('views', 'views');

//  Set library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: 'notsecret',
    saveUninitialized: true,
    resave: false
  })
);

// Use routes
app.use('/auth', signRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
// app.use(errorController);

var headers = new Headers();
headers.append("Content-Type", "application/json");

fetch('http://localhost:3000/testConnect', {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
})
  .then(results => {
    if (results) {
      console.log('Test Connect To Api Success...');
    }
  })
  .catch(err => {
    console.log('Test Connect To Api Fail...');
  });

app.listen(8080);