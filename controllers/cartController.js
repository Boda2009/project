const Cart = require('../models/Cart');

// @desc    Add item to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    // For now, using a placeholder user ID until authentication is set up
    const userId = req.body.userId || "60d0fe4f5311236168a109ca";

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if product already exists in cart, update quantity
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // Create new cart for user
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};