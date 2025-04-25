const itemService = require('../services/itemService');

exports.createItem = async (req, res) => {
    const itemData = {
        ...req.body,
        image: req.file ? req.file.path : null,
        userId: req.user ?.user.id
    }
    const result = await itemService.createItem(req.body);
    res.status(result.status).json(result.data);
};

exports.updateItem = async (req, res) => {
    const result = await itemService.updateItem(req.body);
    res.status(result.status).json(result.data);
};

exports.bidOnItem = async (req, res) => {
    const result = await itemService.bidOnItem(req.body, req.user);
    res.status(result.status).json(result.data);
};