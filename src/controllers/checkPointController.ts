import { Request, Response } from "express";
import CheckPoint from "../models/check-point";
import User from "../models/user";
import Event from "../models/event";

export const addCheckPoint = async (req: Request, res: Response) => {
  try {
    const { nombre, kilometro, evento_id, id_usuario } = req.body;
    const checkPoint = await CheckPoint.create({
      nombre,
      kilometro,
      evento_id,
      id_usuario,
    });
    res.status(201).json(checkPoint);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getCheckPoints = async (req: Request, res: Response) => {
  try {
    const checkPoints = await CheckPoint.findAll({
      include: [
        {
          model: Event,
          attributes: ["nombre"],
        },
        {
          model: User,
          attributes: ["nombre"],
        },
      ],
    });

    return res.status(200).json(checkPoints);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getCheckPointByEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkPoints = await CheckPoint.findAll({
      where: {
        evento_id: id,
      },
      include: [
        {
          model: Event,
          attributes: ["nombre"],
        },
      ],
    });

    return res.status(200).json(checkPoints);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getCheckPointByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkPoints = await CheckPoint.findAll({
      where: {
        id_usuario: id,
      },
      include: [
        {
          model: User,
          attributes: ["nombre"],
        },
      ],
    });

    return res.status(200).json(checkPoints);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
