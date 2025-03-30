
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger";
import { insertarTrabajador } from "../services/trabajadorService";

// Controlador para registrar un nuevo trabajador

export const registrarTrabajador = async (req: Request, res: Response): Promise<void> => {
    // Validación de entrada
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({
        message: "Datos inválidos",
        errores: errores.array(),
      });
      return;
    }
  
    try {
      const datosTrabajador = req.body;
      const nuevoTrabajador = await insertarTrabajador(datosTrabajador);
  
      res.status(201).json({
        message: "Trabajador registrado correctamente",
        trabajador_id: nuevoTrabajador.id,
      });
    } catch (error) {
      logger.error("Error al registrar nuevo trabajador:", error);
      res.status(500).json({ message: "Error al registrar el trabajador" });
    }
  };