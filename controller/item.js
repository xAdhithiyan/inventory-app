const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.item_add_view = asyncHandler(async (req, res) => {
  let allCategory = await Category.find({});
  res.render('addItem', { allCategory });
});
