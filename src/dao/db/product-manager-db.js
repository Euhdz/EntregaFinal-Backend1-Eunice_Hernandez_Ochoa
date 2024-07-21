import ProductModel from "../models/product.model.js";

class ProductManager {
  async addProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  }) {
    try {
      if (!title || !description || !code || !price || !stock || !category) {
        console.log("All fields are mandatory");
        return;
      }

      const existingProduct = await ProductModel.findOne({ code: code });

      if (existingProduct) {
        console.log("The code must be unique");
        return;
      }

      const newProduct = new ProductModel({
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || [],
      });

      await newProduct.save();
    } catch (error) {
      console.log("An error occurred, the product was not loaded", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const productsArray = await ProductModel.find();
      return productsArray;
    } catch (error) {
      console.log("Error obtaining products", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const found = await ProductModel.findById(id);
      if (!found) {
        console.log("Product was not found");
        return null;
      } else {
        console.log("Product was found");
        return found;
      }
    } catch (error) {
      console.log("Error finding the product by id", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const product = await ProductModel.findByIdAndUpdate(id, updatedProduct);

      if (!product) {
        console.log("The product you want to update was not found");
        return null;
      } else {
        console.log("The product was successfully updated");
        return product;
      }
    } catch (error) {
      console.log("Error updating the product", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);
      if (!deleted) {
        console.log("The product you want to delete was not found");
        return null;
      } else {
        console.log("The product was successfully deleted");
        return deleted;
      }
    } catch (error) {
      console.log("Error eliminating the product", error);
      throw error;
    }
  }
}

export default ProductManager;
