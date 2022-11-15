// Call library
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Call database and models
const sequelize = require('./util/connect_mysql');
const Role = require('./models/role');
const Account = require('./models/account');
const Class = require('./models/class');
const Task = require('./models/task');
const Info_Account = require('./models/info_account');
const Account_Class = require('./models/account_class');

// Call Controller
const errorController = require('./controllers/error');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Use routes
app.use('/auth', signin_up_outRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.get404);

// Relationship mysql
Account.belongsTo(Role, { constraints: true, onDelete: 'CASCADE' });
Role.hasMany(Account);
Account.hasOne(Info_Account);
Account.hasMany(Task);
Account.belongsToMany(Class, { through: Account_Class });
Class.belongsToMany(Account, { through: Account_Class });

// run database and run server
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    // create few data about role and account when start server
    Role.findAll()
      .then(roles => {
        if (!roles[0]) {
          Role.create({
            name: 'Admin'
          });

          Role.create({
            name: 'Teacher'
          });
          
          Role.create({
            name: 'Student'
          });
        }
      });

    Account.findAll()
      .then(account => {
        if (!account[0]) {
          Account.create({
            username: 'admin001@gmail.com',
            password: 'ahihi1234',
            status: 1,
            roleId: 1
          });

          Account.create({
            username: 'hung@gmail.com',
            password: 'ahihi1234',
            status: 1,
            roleId: 2
          });

          Account.create({
            username: 'Student@gmail.com',
            password: 'ahihi1234',
            status: 1,
            roleId: 3
          });
        }
      });

    Class.findAll()
      .then(classes => {
        if (!classes[0]) {
          Class.create({
            name: 'C21O9I'
          });
          Class.create({
            name: 'C2108G1'
          });
          Class.create({
            name: 'C2209L'
          });
        }
      });

    Account_Class.findAll()
      .then(account_class => {
        if (!account_class[0]) {
          Account_Class.create({
            quantity: 0,
            accountId: 2,
            classId: 1
          });
          Account_Class.create({
            quantity: 0,
            accountId: 2,
            classId: 2
          });
          Account_Class.create({
            quantity: 0,
            accountId: 3,
            classId: 2
          });
        }
      });

    Info_Account.findAll()
      .then(info => {
        if (!info[0]) {
          Info_Account.create({
            full_name: 'Pham Quang Hung',
            accountId: 3
          });
        }
      });

    Task.findAll()
      .then(task => {
        if (!task[0]) {
          Task.create({
            name: 'Book2',
            status: 1,
            accountId: 3
          });
        }
      });
    return app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
