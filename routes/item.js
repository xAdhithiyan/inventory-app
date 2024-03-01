const express = require('express');
const router = express.Router();
const item_controller = require('../controller/item');

router.get('/add-item', item_controller.item_add_view);

module.exports = router;
