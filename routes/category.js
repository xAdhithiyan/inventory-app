const express = require('express');
const router = express.Router();
const category_controller = require('../controller/category');
const category = require('../models/category');

router.get('/', category_controller.category_list);
router.post('/add-category', category_controller.category_add);
router.get('/add-category', category_controller.category_add_view);
router.delete('/:id', category_controller.category_delete);
router.get('/:id', category_controller.category_view);

// for udpating (using the same view that is used for adding category)
router.get('/add-category/:id', category_controller.category_update_view);
router.put('/add-category/:id/:name', category_controller.category_update);

module.exports = router;
