import { Request, Response } from "express";
import Time from "../models/time";
import CheckPoint from "../models/check-point";
import User from "../models/user";
import Competitor from "../models/competitor";

function isValidTime(time: string): boolean {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    return false;
  }
  return true;
}

export const addTime = async (req: Request, res: Response) => {
  try {
    const {
      tiempo,
      tipo_registro,
      participante_id,
      usuario_id,
      punto_control_id,
    } = req.body;

    if (!isValidTime(tiempo)) {
      return res.status(400).json({
        msg: `Invalid time: ${tiempo}. Time should be in HH:MM:SS format.`,
      });
    }

    const newTime = await Time.create({
      tiempo,
      tipo_registro,
      participante_id,
      usuario_id,
      punto_control_id,
    });

    return res.status(201).json({
      msg: "Time added successfully",
      newTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
      error,
    });
  }
};

export const getTimes = async (req: Request, res: Response) => {
  try {
    const times = await Time.findAll({
      include: [
        {
          model: User,
          attributes: ["nombre"],
        },
        {
          model: Competitor,
          attributes: ["nombre", "numero_competido"],
        },
        {
          model: CheckPoint,
          attributes: ["nombre", "kilometro"],
        },
      ],
    });

    return res.status(200).json(times);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getTimeByCompetitor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const times = await Time.findAll({
      where: { participante_id: id },
      include: [
        {
          model: Competitor,
          attributes: ["nombre", "numero_competido"],
        },
        {
          model: CheckPoint,
          attributes: ["nombre", "kilometro"],
        },
      ],
    });

    return res.status(200).json(times);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getTimeByCheckPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const times = await Time.findAll({
      where: { punto_control_id: id },
      include: [
        {
          model: Competitor,
          attributes: ["nombre", "numero_competido"],
        },
        {
          model: CheckPoint,
          attributes: ["nombre", "kilometro"],
        },
      ],
    });

    return res.status(200).json(times);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
