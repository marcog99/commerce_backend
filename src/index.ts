import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("Connection Succesfully");
    app.listen(PORT, () => console.log("Running at http://localhost:3000"));
  })
  .catch((err) => console.error("Error happened:", err));
