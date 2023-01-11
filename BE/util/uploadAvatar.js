const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, 'public/avatar');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file && file.fieldname === 'avatar' && file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileSize = 5 * 1024 * 1024;

const upload = multer({ storage: fileStorage, limits: { fileSize: fileSize }, fileFilter: fileFilter }).array('avatar', 1);

module.exports = upload;