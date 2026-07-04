const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required for an order item']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  priceAtPurchase: {
    type: Number,
    required: [true, 'Price at purchase is required']
  }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user']
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: [true, 'Total order amount is required'],
      min: [0, 'Total amount cannot be negative']
    },
    shippingAddress: {
      type: String,
      required: [true, 'Shipping address is required']
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        message: '{VALUE} is not a valid order status'
      },
      default: 'Pending'
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Paid', 'Refunded'],
      default: 'Unpaid'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);