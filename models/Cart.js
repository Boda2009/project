const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required for a cart item']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a user']
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);