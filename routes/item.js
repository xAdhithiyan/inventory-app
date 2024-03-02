const express = require('express');
const router = express.Router();
const item_controller = require('../controller/item');

router.get('/', item_controller.item_list);
router.get('/add-item', item_controller.item_add_view);
router.post('/add-item', item_controller.item_add);

module.exports = router;
