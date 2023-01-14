const mongoose = require('mongoose');

const dataModelsSauce = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    userLiked: { type: String },
    userDisliked: { type: String},
  });

  module.exports = mongoose.model('Thing', dataModelsSauce);