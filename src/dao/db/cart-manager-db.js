import CartModel from "../models/cart.model.js";

class CartManager {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.error("Error creating the cart", error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error(`No cart found with id ${cartId}`);
      }
      return cart;
    } catch (error) {
      console.error("Error getting cart by ID:", error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getCartById(cartId);
      const existingProduct = cart.products.find(
        (p) => p.product.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error adding product to the cart", error);
      throw error;
    }
  }
}

export default CartManager;
