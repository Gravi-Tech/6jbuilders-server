const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../public/uploads");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    const filename = uniqueSuffix + "." + extension;

    console.log("Uploaded Filename:", filename);

    cb(null, filename);
  },
});

const upload = multer({ storage });

const uploadSingleImage = (req, res, next) => {
  upload.single("bg_img")(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: true, message: "Failed to upload image" });
    }
    next();
  });
};

const uploadMultipleImages = (req, res, next) => {
  upload.array("project_imgs", 5)(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: true, message: "Failed to upload images" });
    }
    next();
  });
};

module.exports = { uploadSingleImage, uploadMultipleImages };
