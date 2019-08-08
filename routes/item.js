const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item');

router.post('/add_item', ItemController.addItem);
router.get('/get_items', ItemController.getItems);
router.put('/edit_item', ItemController.editItem);
router.delete('/delete_item/:id', ItemController.deleteItem);

module.exports = router;
