import { Request, Response } from "express";
import Category from "../models/category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        msg: `Category with id ${id} not found`,
      });
    } else {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({
          msg: `Category with id ${id} not found`,
        });
      }
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        msg: `Category with id ${id} not found`,
      });
    } else {
      await category.destroy();
      res.status(200).json({
        msg: `Category with id ${id} deleted`,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
    console.log(error);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;

    // Validación de entrada
    if (!body || !id) {
      return res.status(400).json({ msg: "Invalid input" });
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        msg: `Category with id ${id} not found`,
      });
    }

    await category.update(body);

    res.status(200).json({
      msg: `Category with id ${id} updated`,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const category = await Category.create({ nombre });

    res.status(200).json({
      msg: "Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
