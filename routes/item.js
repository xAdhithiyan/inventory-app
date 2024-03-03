const express = require('express');
const router = express.Router();
const item_controller = require('../controller/item');

router.get('/', item_controller.item_list);
router.get('/add-item', item_controller.item_add_view);
router.post('/add-item', item_controller.item_add);
router.delete('/:id', item_controller.item_delete);

// for udpating (using the same view that is used for adding category)
router.get('/add-item/:id', item_controller.item_update_view);
router.put('/add-item/:id/:name', item_controller.item_update);

module.exports = router;
