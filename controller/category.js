const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res) => {
  const allCategory = await Category.find({});
  res.status(200).json(allCategory);
});

exports.category_add = asyncHandler(async (req, res) => {
  const addedCategory = await Category.create(req.body);
  res.json(addedCategory);
});
