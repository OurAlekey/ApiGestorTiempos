import { Request, Response } from "express";
import Event from "../models/event";
import Category from "../models/category";

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { nombre, fecha, ubicacion, categoria_id } = req.body;
    const event = await Event.create({
      nombre,
      fecha,
      ubicacion,
      categoria_id,
    });
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Category,
          attributes: ["nombre"],
        },
      ],
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getEventByCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const events = await Event.findAll({
      where: {
        categoria_id: id,
      },
      include: [
        {
          model: Category,
          attributes: ["nombre"],
        },
      ],
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
