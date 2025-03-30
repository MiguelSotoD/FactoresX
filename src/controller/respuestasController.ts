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
      const { trabajador_id, respuestas } = req.body;
      const trabajador_idNumber = parseInt(trabajador_id, 10);
      const respuestasGuardadas = await insertarRespuestas(trabajador_idNumber, respuestas);
  
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
      const filas = await obtenerUsuariosRespuesta();
  
      // Agrupar respuestas por trabajador
      const agrupado = new Map();
  
      for (const fila of filas) {
        const id = fila.trabajador_id;
        if (!agrupado.has(id)) {
          agrupado.set(id, {
            trabajador_id: id,
            nombre: fila.trabajador_nombre,
            puesto: fila.puesto,
            departamento: fila.departamento,
            cuestionarios: [],
          });
        }
  
        agrupado.get(id).cuestionarios.push({
          cuestionario_id: fila.cuestionario_id,
          nombre_cuestionario: fila.nombre_cuestionario,
          pregunta_id: fila.pregunta_id,
          texto_pregunta: fila.texto_pregunta,
          respuesta: fila.respuesta,
          fecha_respuesta: fila.fecha_respuesta,
        });
      }
  
      const usuariosConEstado = Array.from(agrupado.values()).map((usuario: any) => ({
        trabajador_id: usuario.trabajador_id,
        nombre: usuario.nombre,
        puesto: usuario.puesto,
        departamento: usuario.departamento,
        respondido: usuario.cuestionarios.length > 0,
        respuestas: usuario.cuestionarios,
      }));
  
      res.status(200).json({
        message: "Trabajadores y respuestas obtenidas correctamente",
        data: usuariosConEstado,
      });
  
    } catch (error) {
      logger.error("Error en el controlador al obtener respuestas de Trabajador:", error);
      res.status(500).json({ message: "Error al obtener respuestas de Trabajador" });
    }
  };
  