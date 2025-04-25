const Item = require('../models/Item');
const Bid = require('../models/Bid');

exports.createItem = async (data) => {
    try {
        const item = new Item({ title: data.title, description: data.description, price: data.price, image: data.image, id: data.id, endTime: data.endTime });
        await item.save();
        return { status: 200, data: { success: true, item } };
    } catch (error) {
        return { status: 400, data: { errors: 'Item could not be added' } };
    }
};

exports.updateItem = async (data) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            data.id,
            { title: data.title, description: data.description, price: data.price },
            { new: true }
        );
        if (!updatedItem) return { status: 400, data: { error: 'Item not found' } };
        return { status: 200, data: updatedItem };
    } catch (error) {
        return { status: 500, data: { message: 'Something went wrong', error: error.message } };
    }
};

exports.bidOnItem = async (data, user) => {
    try {
        const item = await Item.findById(data.itemId);
        if (!item) return { status: 404, data: { error: 'Item not found' } };

        if (data.bidAmount <= item.price) {
            return { status: 400, data: { error: 'Bid must be higher than current price' } };
        }

        const bid = new Bid({
            image: data.image,
            title: item.title,
            description: item.description,
            bidAmount: data.bidAmount,
            bidderId: user.userId,
            itemId: data.itemId
        });
        await bid.save();

        item.price = data.bidAmount;
        item.highestBidder = user.userId;
        await item.save();

        return {
            status: 200,
            data: {
                success: true,
                item: {
                    image: item.image,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    highestBidder: item.highestBidder
                }
            }
        };
    } catch (error) {
        return { status: 400, data: { error: 'Bid failed', details: error.message } };
    }
};