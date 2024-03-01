const Category = require('../models/category');
const Items = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.category_total = asyncHandler(async (req, res) => {
  const [allCategory, allItems] = await Promise.all([
    Category.find(),
    Items.find(),
  ]);

  res.render('index', {
    totalCategory: allCategory.length,
    totalItems: allItems.length,
  });
});
