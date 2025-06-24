import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entity/Product";
import { Multer } from "multer";
import { MoreThan } from "typeorm";

const productRepo = AppDataSource.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  try {
    const stockLimit = req.query.stockLimit ? parseInt(req.query.stockLimit as string, 10) : null;
    const products = await productRepo.find({
      where: stockLimit !== null ? { stock: MoreThan(stockLimit) } : {},
      relations: ["category"],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};


export const getProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const product = await productRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["category"],
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const file = (req as Request & { file?: Express.Multer.File }).file;

    const { name, description, price, sku, stock, categoryId } = req.body;
    const image = file ? `/uploads/${file.filename}` : "";

    const product = productRepo.create({
      name,
      description,
      price: parseFloat(price),
      sku,
      stock: parseInt(stock),
      categoryId: categoryId || null,
      image,
    });

    const savedProduct = await productRepo.save(product);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const existing = await productRepo.findOneBy({ id });

    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, sku, stock, categoryId } = req.body;

    const image = (req as Request & { file?: Express.Multer.File }).file
      ? `/uploads/${(req as any).file.filename}`
      : existing.image;

    productRepo.merge(existing, {
      name,
      description,
      price: parseFloat(price),
      sku,
      stock: parseInt(stock),
      categoryId: categoryId || null,
      image,
    });

    const result = await productRepo.save(existing);
    res.json(result);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await productRepo.delete(req.params.id);
    if (result.affected === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
