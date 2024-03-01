const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.category_list = asyncHandler(async (req, res) => {
  const allCategory = await Category.find({});
  res.render('category', { allCategory });
});

exports.category_add_view = asyncHandler(async (req, res) => {
  res.render('addCategory', { name: '', desc: '', errors: [] });
});

exports.category_add = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name field cannot be empty')
    .escape(),
  body('desc')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description field cannot be empty')
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { name, desc } = req.body;
    if (!errors.isEmpty()) {
      res.render('addCategory', { name, desc, errors: errors.errors });
    } else {
      const addedCategory = await Category.create(req.body);
      res.redirect('/category');
    }
  }),
];
