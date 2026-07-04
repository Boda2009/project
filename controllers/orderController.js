const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create new order with complete Stock Verification
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, totalAmount, items } = req.body;
    // Temporary user ID placeholder until Auth middleware is integrated
    const userId = req.body.userId || "60d0fe4f5311236168a109ca";

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty." });
    }

    // =========================================================
    // LOOP 1: STOCK VERIFICATION (Checking availability)
    // =========================================================
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} does not exist.`
        });
      }

      // Verify if available inventory satisfies requested quantity
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for '${product.name}'. Available inventory: ${product.stock}, requested: ${item.quantity}.`
        });
      }
    }

    // =========================================================
    // LOOP 2: INVENTORY UPDATE (Deducting stock safely)
    // =========================================================
    for (const item of items) {
      // Use negative increment ($inc) to subtract the purchased amount
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // =========================================================
    // ORDER CREATION & CLEANUP
    // =========================================================
    const newOrder = await Order.create({
      user: userId,
      items: items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase
      })),
      totalAmount,
      shippingAddress,
      status: 'Pending'
    });

    // Clear user's active cart after order placement succeeds
    await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [], totalPrice: 0 } });

    // Respond with created order info
    res.status(201).json({ success: true, data: newOrder });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};