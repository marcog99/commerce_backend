// src/config/data-source.ts
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import dotenv from "dotenv";

dotenv.config()
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "1433"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Category, Product],
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
