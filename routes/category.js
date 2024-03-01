const express = require('express');
const router = express.Router();
const category_controller = require('../controller/category');

router.get('/', category_controller.category_list);
router.post('/add-category', category_controller.category_add);
router.get('/add-category', category_controller.category_add_view);

module.exports = router;
