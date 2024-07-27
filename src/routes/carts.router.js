import express from "express";
import CartManager from "../dao/db/cart-manager-db.js";
import CartModel from "../dao/models/cart.model.js";

const router = express.Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error creating a new cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await CartModel.findById(cartId).populate("products");

    if (!cart) {
      console.error("We could not find a cart with the submitted id", error);
      return res.status(404).json({
        error: "Cart was not found",
      });
    }

    return res.json(cart.products);
  } catch (error) {
    console.error("Error getting the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updatedCart = await cartManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error adding product to the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const updatedCart = await cartManager.removeProductFromCart(
      cartId,
      productId
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error removing product from the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body.products;
  try {
    const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error updating the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const newQuantity = req.body.quantity;
  try {
    const updatedCart = await cartManager.updateProductQuantity(
      cartId,
      productId,
      newQuantity
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error updating product quantity in the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    await cartManager.clearCart(cartId);
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
