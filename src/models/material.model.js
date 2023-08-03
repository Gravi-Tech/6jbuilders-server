const mongoose = require("mongoose");

const materialTypes = [
  "Concrete",
  "Steel",
  "Wood",
  "Bricks",
  "Cement Blocks",
  "Asphalt",
  "Glass",
  "Tiles",
  "Plaster",
  "Insulation Materials",
  "Roofing Materials",
  "Gypsum",
  "Aggregates",
  "Paints and Coatings",
  "Electrical and Plumbing Materials",
  "Composite Materials",
  "Sustainable and Eco-friendly Materials",
];

const MaterialSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  material: {
    type: String,
    enum: materialTypes,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Material = mongoose.model("Material", MaterialSchema);

module.exports = Material;
