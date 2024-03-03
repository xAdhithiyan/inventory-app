const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.item_list = asyncHandler(async (req, res) => {
  let allItems = await Item.find({});
  res.render('item', { allItems });
});

exports.item_add_view = asyncHandler(async (req, res) => {
  let allCategory = await Category.find({});
  res.render('addItem', { data: [], allCategory, errors: [] });
});

exports.item_add = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name field cannot be empty').escape(),
  body('desc').trim().isLength({ min: 1 }).withMessage('Description field cannot be empty').escape(),
  body('price')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Price field cannot be empty')
    .bail()
    .isNumeric()
    .withMessage('Price must be a number')
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    let allCategory = await Category.find({});
    if (!errors.isEmpty()) {
      console.log(req.body.category);
      res.render('addItem', {
        data: req.body,
        allCategory,
        errors: errors.errors,
      });
    } else {
      let newItem = await Item.create(req.body);
      res.redirect('/item');
    }
  }),
];

exports.item_delete = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.redirect('/item');
    console;
  } catch (err) {
    res.status(404).json('Error: Category Not found ');
  }
};

exports.item_update_view = asyncHandler(async (req, res) => {
  const [item, allCategory] = await Promise.all([Item.findById(req.params.id), Category.find({})]);
  res.render('addItem', {
    data: item,
    allCategory,
    errors: [],
    givenMethod: true,
    item_id: item._id,
    item_name: item.name,
  });
});

exports.item_update = asyncHandler(async (req, res) => {
  const category = await Item.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/item');
});
