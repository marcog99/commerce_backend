import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Category } from "../entity/Category";

const categoryRepo = AppDataSource.getRepository(Category);

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepo.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const category = await categoryRepo.findOneBy({
      id: Number(req.params.id),
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = categoryRepo.create({ name, description });
    const savedCategory = await categoryRepo.save(category);
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const category = await categoryRepo.findOneBy({
      id: Number(req.params.id),
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    categoryRepo.merge(category, req.body);
    const result = await categoryRepo.save(category);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await categoryRepo.delete(req.params.id);
    if (result.affected === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
