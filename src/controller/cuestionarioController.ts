import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger";
import { crearCuestionario } from "../services/cuestionarioServices";
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






