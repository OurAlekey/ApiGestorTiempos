import { Request, Response } from "express";
import Competitor from "../models/competitor";
import Category from "../models/category";
import Event from "../models/event";
import Team from "../models/team";

export const addCompetitor = async (req: Request, res: Response) => {
  try {
    const { nombre, numero_competido, evento_id, equipo_id, categoria_id } =
      req.body;
    const competitor = await Competitor.create({
      nombre,
      numero_competido,
      evento_id,
      equipo_id,
      categoria_id,
    });
    res.status(201).json(competitor);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getCompetitors = async (req: Request, res: Response) => {
  try {
    const competitors = await Competitor.findAll({
      include: [
        {
          model: Category,
          attributes: ["nombre"],
        },
      ],
    });

    return res.status(200).json(competitors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getCompetitorsbyEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const competitors = await Competitor.findAll({
      where: {
        evento_id: id,
      },
      include: [
        {
          model: Event,
          attributes: ["nombre"],
          include: [{ model: Category, attributes: ["nombre"] }],
        },
      ],
    });

    return res.status(200).json(competitors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getCompetitorbyTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const competitors = await Competitor.findAll({
      where: {
        equipo_id: id,
      },
      include: [
        {
          model: Team,
          attributes: ["nombre"],
        },
      ],
    });

    return res.status(200).json(competitors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getCompetitorbyCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const competitors = await Competitor.findAll({
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

    return res.status(200).json(competitors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
