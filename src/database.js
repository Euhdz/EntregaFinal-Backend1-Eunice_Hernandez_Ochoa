import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://euhdz8a:coderhouse@cluster0.bphuura.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Successful connection"))
  .catch((error) => console.log("We have a connection error", error));
