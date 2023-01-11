const express = require('express');
const routes = express.Router();
const multer = require('multer');
const uploadAvatar = require('../util/uploadAvatar');
const fs = require('fs');

const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/isAdmin');

// account
routes.get('/account', isAdmin, adminController.getAllAccount);
routes.post('/account/add', isAdmin, adminController.postAddAccount);
routes.post('/account/update', isAdmin, adminController.postUpdateAccount);
routes.post('/account/info/update/', isAdmin, adminController.postUpdateInfoAccount);
routes.post('/account/active', isAdmin, adminController.getActiveAccount);
routes.post('/account/inactive', isAdmin, adminController.getInActiveAccount);

// task
routes.get('/account/todolist', isAdmin, adminController.getTodolistbyAccountId);

// classroom
routes.get('/classroom', isAdmin, adminController.getAllClassroom);
routes.post('/classroom/add', isAdmin, adminController.postAddClassroom);
routes.post('/classroom/update', isAdmin, adminController.postUpdateClassroom);
routes.post('/classroom/delete', isAdmin, adminController.postDeleteClassroom);
routes.post('/classroom/add_student', isAdmin, adminController.postAddStudentWithClassroom);
routes.post('/classroom/delete_student', isAdmin, adminController.postDeleteStudentWithClassroom);

// role
routes.get('/role', adminController.getRoles);

//upload avatar
routes.post('/upload_avatar', isAdmin, (req, res) => {
  uploadAvatar(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(200).json({
        error: {
          error: 500,
          message: `Multer uploading error: ${err.message}`
        },
        data: {}
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == 'ExtensionError') {
        return res.status(200).json({
          error: {
            error: 413,
            message: err.message
          },
          data: {}
        });
      } else {
        return res.status(200).json({
          error: {
            error: 500,
            message: `Unknown uploading error: ${err.message}`
          },
          data: {}
        });
      }
    }

    // Everything went fine.
    // show file `req.files`
    // show body `req.body`
    return res.status(200).json({
      error: {
        error: 200,
        message: 'Your files uploaded.'
      },
      data: {
        avatar: 'http://localhost:3000/avatar/' + req.file.path
      }
    });
  })
});

module.exports = routes;