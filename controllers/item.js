const Item = require('../models/item');

module.exports = {
  getItems: async (req, res, next) => {
    const items = await Item.find({});

    try {
      res.status(200).json({ items });
    } catch (e) {
      next(e);
    }
  },
  addItem: async (req, res, next) => {
    const item = new Item(req.body);
    await item.save();

    try {
      res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  },
  editItem: async (req, res, next) => {
    await Item.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { name: req.body.name } }
    );

    try {
      res.status(204).json({
        message: 'Successsuccessfully updated!'
      });
    } catch (e) {
      next(e);
    }
  },
  deleteItem: async (req, res, next) => {
    const item = await Item.findOne({ _id: req.params.id });
    await Item.deleteOne({ _id: item._id });

    try {
      res.status(201).json({
        message: 'Successsuccessfully deleted!'
      });
    } catch (e) {
      next(e);
    }
  }
};
