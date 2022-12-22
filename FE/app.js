// Call library
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Call Controller
const errorController = require('./services/error');

const app = express();

// Call routes
const signin_up_outRoutes = require('./routes/signin_up_out');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');

// set views
app.set('view engine', 'ejs');
app.set('views', 'views');


//  Set library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use routes
app.use('/auth', signin_up_outRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use(studentRoutes);
app.use(errorController);

app.listen(3000);