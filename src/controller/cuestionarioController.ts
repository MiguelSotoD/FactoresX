import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger";
import { crearCuestionario } from "../services/cuestionarioServices";
import { insertarPreguntas } from "../services/preguntaService";
import { insertarRespuestas } from "../services/respuestaServices";
// Crear un nuevo cuestionario
export const nuevoCuestionario = async (req: Request, res: Response) : Promise<void> => {
    // Validar errores de entrada
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        res.status(400).json({
        message: "Datos inválidos",
        errores: errores.array()
        });
    }
   try {
        const dataCuestionario = req.body;
        const nuevoCuestionario = await crearCuestionario(dataCuestionario);
         //Enviar respuesta exitosa (201) con los datos de la Clase
         res.status(201).json({
            message: "Clase Creada exitosamente",
            clase: nuevoCuestionario
          });

    }catch (error) {
        logger.error("Error al crear el cuestionario", error);
        res.status(500).json({ message: "Error al crear el cuestionario" });
    }

}



//   CONTROLADOR PARA GUARDAR RESPUESTAS
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


