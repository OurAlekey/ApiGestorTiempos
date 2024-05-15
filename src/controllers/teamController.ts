import { Request, Response } from "express";
import Team from "../models/team";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        msg: `Team with id ${id} not found`,
      });
    } else {
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({
          msg: `Team with id ${id} not found`,
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

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        msg: `Team with id ${id} not found`,
      });
    } else {
      await team.destroy();
      res.status(200).json({
        msg: `Team with id ${id} deleted`,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        msg: `Team with id ${id} not found`,
      });
    } else {
      await team.update(req.body);
      res.status(200).json({
        msg: `Team with id ${id} updated`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const team = await Team.create({ nombre });
    res.status(200).json(team);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
