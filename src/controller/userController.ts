import {
  crearUserService,
  ingresarUserService,
  showUserServices,
} from "../services/userService";
import { Request, Response } from "express";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const newUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = req.body;
    const userNuevo = await crearUserService(userData);

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

export const signUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email y password son requeridos" });
      return;
    }

    const user = await ingresarUserService(email, password);

    if (!user) {
      res.status(401).json({ message: "Email y password son incorrectos" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Guardar el token en las cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user,
    });
  } catch (err) {
    logger.error("Error en el login: ", err.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const logoutUserController = (req: Request, res: Response): void => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión." });
  }
};

export const showUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await showUserServices();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Error al obtener los usuarios: ", error.message);
    res.status(500).json({
      error:
        "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
    });
  }
};
