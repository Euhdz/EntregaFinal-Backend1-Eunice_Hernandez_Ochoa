import { Router } from "express";
const router = Router();

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

import ProductManager from "../dao/fs/product-manager.js";
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    res.render("home", { products });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

export default router;
