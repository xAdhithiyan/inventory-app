const express = require('express');
const router = express.Router();
const Category = require('../controller/category');

router.get('/category', Category.category_list);
router.post('/category', Category.category_add);

module.exports = router;
