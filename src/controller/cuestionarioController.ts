import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger";
import { crearCuestionario, obtenerCuestionariosConPreguntas, obtenerByIDCuestionarioConPreguntas } from "../services/cuestionarioServices";
import { validarExistenciaCuestionario } from "../services/validators/existenciaValidator";
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

export const cuestionarioConPreguntas = async (req: Request, res: Response): Promise<void> => {
    try {
      const cuestionarios = await obtenerCuestionariosConPreguntas();
  
      res.status(200).json({
        message: "Cuestionarios obtenidos correctamente",
        data: cuestionarios,
      });
    } catch (error) {
      logger.error("Error en controlador al listar cuestionarios:", error);
      res.status(500).json({ message: "Error al obtener los cuestionarios" });
    }
  };
  

  export const cuestionarioConPreguntasbyId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      res.status(400).json({ error: "El ID proporcionado no es válido" });
      return;
    }
    try {
      await validarExistenciaCuestionario(idNumber); // Validar existencia del cuestionario

      const cuestionario = await obtenerByIDCuestionarioConPreguntas(idNumber);
      
      if (!cuestionario) {
        res.status(400).json({ error: "No se pudo editar el alumno. Verifica los datos." });
        return;
      }
      res.status(200).json({
        message: "Cuestionario obtenido correctamente",
        data: cuestionario,
      });
    } catch (error) {
      const msg = error.message || "Error interno del servidor";
      const status = msg.includes("No se encontró el cuestionario") ? 404 : 500;
      logger.error("Error en controlador al mostrar las preguntas del cuestionario:", error);
      res.status(500).json({ message: "El cuestionario no existe" });
    }
  };
  



