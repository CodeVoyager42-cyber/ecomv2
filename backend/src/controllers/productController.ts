import { Request, Response } from "express";
import ProductsData from "../data/Products";

export const getProducts = (_req: Request, res: Response) => {
  res.json(ProductsData);
};
