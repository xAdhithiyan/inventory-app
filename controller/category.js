const Category = require('../models/category');
const Item = require('../models/item');
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
  body('name').trim().isLength({ min: 1 }).withMessage('Name field cannot be empty').escape(),
  body('desc').trim().isLength({ min: 1 }).withMessage('Description field cannot be empty').escape(),

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

exports.category_delete = async (req, res) => {
  try {
    // not using pormise.all since i want this to happen one after the other and not simultaneously
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    const allCategory = await Category.find();
    res.redirect('/category');
    console;
  } catch (err) {
    res.status(404).json('Error: Category Not found ');
  }
};

exports.category_update_view = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render('addCategory', {
    name: category.name,
    desc: category.desc,
    errors: [],
    givenMethod: true,
    category_id: category._id,
    category_name: category.name,
  });
});

exports.category_update = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body);
  const items = await Item.updateMany({ category: req.params.name }, { category: req.body.name });
  res.redirect('/category');
});

exports.category_view = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const allItems = await Item.find({ category: category.name });
  res.render('viewCategory', { category, allItems });
});
