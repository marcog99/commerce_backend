import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export const loginUser = async (req: Request, res: Response):Promise<any> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

    const { email, password } = req.body;
    const user = await userRepo.findOneBy({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password ?? '');
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await userRepo.findOneBy({ id: Number(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const createUser = async (req: Request, res: Response):Promise<any> => {
  try {
    const { names, lastNames, email, password, rol } = req.body;

    const existUser = await userRepo.findOneBy({ email });
    if (existUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({
      names,
      lastNames,
      email,
      password: hashedPassword,
      rol,
    });

    const savedUser = await userRepo.save(user);
    delete savedUser.password;

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await userRepo.findOneBy({ id: Number(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });

    userRepo.merge(user, req.body);
    const result = await userRepo.save(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await userRepo.delete(req.params.id);
    if (result.affected === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
