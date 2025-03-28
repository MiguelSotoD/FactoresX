import { crearUser, ingresarUser } from "../services/userService";
import { Request, Response } from "express";
import logger from "../utils/logger";

export const newUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;
    const userNuevo = await crearUser(userData);

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: userNuevo,
    });
  } catch (error) {
    logger.error("Error al crear el usuario: ", error.message);
    res.status(500).json({
      error:
        "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
    });
  }
};

export const signUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email y password son requeridos" });
      return;
    }

    const user = await ingresarUser(email, password);

    if (!user) {
      res.status(401).json({ message: "Email y password son incorrectos" });
      return;
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user,
    });
  } catch (err) {
    logger.error("Error en el login: ", err.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
