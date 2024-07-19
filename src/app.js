import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import "./database.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});

import ProductManager from "./dao/fs/product-manager.js";

const productManager = new ProductManager("./src/data/products.json");

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("A client has connected");

  socket.emit("products", await productManager.getProducts());

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);

    io.sockets.emit("products", await productManager.getProducts());
  });
  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);

    io.sockets.emit("products", await productManager.getProducts());
  });
});
