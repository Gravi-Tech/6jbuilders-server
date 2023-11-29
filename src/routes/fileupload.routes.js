
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")
router.post("/file-upload", upload.array('files'), (req, res) => {
    console.log('transfer this to controller and services also return the file path as response')
    res.json({success: true})
});

module.exports = router;