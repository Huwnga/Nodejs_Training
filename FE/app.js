// Call library
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Call Controller
// const errorController = require('./services/error');

const app = express();

// Call routes
const signRoutes = require('./routes/sign');
// const adminRoutes = require('./routes/admin');
// const teacherRoutes = require('./routes/teacher');
// const studentRoutes = require('./routes/student');

// set views
app.set('view engine', 'ejs');
app.set('views', 'views');

//  Set library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/auth', signRoutes);
// app.use('/admin', adminRoutes);
// app.use('/teacher', teacherRoutes);
// app.use(studentRoutes);
// app.use(errorController);

app.listen(8080);