
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger";
import { insertarPreguntas } from "../services/preguntaService";

// Controlador para agregar preguntas a un cuestionario
export const agregarPreguntas = async (req: Request, res: Response): Promise<void> => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({
        message: "Datos inválidos",
        errores: errores.array(),
      });
      return;
    }
  
    try {
      const { cuestionario_id, preguntas } = req.body;
      const nuevasPreguntas = await insertarPreguntas(cuestionario_id, preguntas);
  
      res.status(201).json({
        message: "Preguntas agregadas correctamente",
        preguntas: nuevasPreguntas,
      });
    } catch (error: any) {
      logger.error("Error al agregar preguntas:", error);
  
      const mensaje = error.message || "Error interno al agregar preguntas";
      const statusCode = mensaje.includes("No se encontró el cuestionario")
        ? 404
        : 500;
  
      res.status(statusCode).json({ message: mensaje });
    }
  };
