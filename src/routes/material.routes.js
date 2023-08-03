const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const MaterialController = require('../controllers/material.controller');

router.get("/materials", Authorization.authorized, MaterialController.getMaterials);
router.post("/materials", Authorization.authorized, MaterialController.addMaterial);
router.get("/materials/:id", Authorization.authorized, MaterialController.getMaterialById);
router.put("/materials/:id", Authorization.authorized, MaterialController.updateMaterial);
router.delete("/materials/:id", Authorization.authorized, MaterialController.deleteMaterial);

module.exports = router;
