const multer = require('multer');
const path = require('path');
const filepath = path.join(__dirname, '../../public/uploads')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    console.log('🚀 ~ file: upload.js:9 ~ req:', req.files);
    console.log('🚀 ~ file: upload.js:6 ~ file:', file);
    cb(null, file.originalname);
  },
});

module.exports = multer({ storage: storage });
