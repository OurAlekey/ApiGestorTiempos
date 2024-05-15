import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

export interface IUser {
  id_user: number;
  nombre: string;
  contrasena: string;
  correo: string;
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `User with id ${id} not found`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: `User with id ${id} not found`,
    });
  } else {
    await user.destroy();
    res.json({
      msg: `User with id ${id} deleted`,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;

    // Validación de entrada
    if (!body || !id) {
      return res.status(400).json({ msg: "Invalid input" });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ msg: `User with id ${id} not found` });
    }

    let hashedPassword;

    if (body.contrasena) {
      hashedPassword = await bcrypt.hash(body.contrasena, 10);
    }

    await user.update({
      nombre: body.nombre,
      correo: body.correo,
      contrasena: hashedPassword,
    });

    res.status(200).json({ msg: `User with id ${id} updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const newUser = async (req: Request, res: Response) => {
  const { nombre, correo, contrasena } = req.body;

  //Validate if the user already exists
  const user = (await User.findOne({
    where: { nombre: nombre },
  })) as IUser | null;

  if (user) {
    return res.status(400).json({
      msg: `User ${correo} already exists!`,
    });
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  try {
    User.create({
      nombre: nombre,
      correo: correo,
      contrasena: hashedPassword,
    });


    res.json({
      msg: `User ${nombre} created successfully!`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error creating user",
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { correo, contrasena } = req.body;

  //Validate if the user already exists
  const user = (await User.findOne({
    where: { correo: correo },
  })) as IUser | null;

  if (!user) {
    return res.status(400).json({
      msg: `User ${correo} not found!`,
    });
  }

  //Validate if the password is correct
  const validPassword = await bcrypt.compare(contrasena, user.contrasena);

  if (!validPassword) {
    return res.status(400).json({
      msg: "Invalid password",
    });
  }

  //Generate token
  const token = jwt.sign(
    {
      correo: correo,
    },
    process.env.SECRET_KEY || "secret",
    {
      expiresIn: "1800000", //30 minutes
    }
  );

  res.json({
    msg: "Logged in",
    token,
  });
};
