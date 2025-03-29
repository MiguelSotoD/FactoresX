//   CONTROLADOR PARA GUARDAR RESPUESTAS
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger";
import { insertarRespuestas } from "../services/respuestaServices";
import { obtenerUsuariosRespuesta } from "../services/respuestaServices";
export const guardarRespuestas = async (req: Request, res: Response): Promise<void> => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({
        message: "Datos inválidos",
        errores: errores.array(),
      });
      return;
    }
  
    try {
      const { usuario_id, respuestas } = req.body;
      const respuestasGuardadas = await insertarRespuestas(usuario_id, respuestas);
  
      res.status(201).json({
        message: "Respuestas guardadas correctamente",
        respuestas: respuestasGuardadas,
      });
    } catch (error) {
      logger.error("Error en el controlador al guardar respuestas:", error);
      res.status(500).json({ message: "Error al guardar respuestas" });
    }
  };

export const verRespuestaUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuariosRespuesta = await obtenerUsuariosRespuesta();
    
    const usuariosConEstado = usuariosRespuesta.map((usuario: any) => ({
      usuario_id: usuario.usuario_id,
      nombre: usuario.nombre,
      cuestionario: usuario.cuestionario,
      respondido: usuario.cuestionario && usuario.cuestionario.length > 0 ? true : false,
    }));

    res.status(200).json({
      message: "Usuarios y estado de cuestionarios obtenidos correctamente",
      data: usuariosConEstado,
    });
  } catch (error) {
    logger.error("Error en el controlador al obtener respuestas de usuarios:", error);
    res.status(500).json({ message: "Error al obtener respuestas de usuarios" });
  }
};