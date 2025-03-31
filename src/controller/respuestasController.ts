//   CONTROLADOR PARA GUARDAR RESPUESTAS
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger";
import { insertarRespuestas } from "../services/respuestaServices";
import { obtenerUsuariosRespuesta } from "../services/respuestaServices";
import { validarPreguntaNoRespondida } from "../services/validators/existenciaValidator";
import { analizarResultadosPorTrabajador } from "../services/resultadosServices";

export const guardarRespuestas = async (req: Request, res: Response): Promise<void> => {

  // Validar errores de entrada
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
      // Validar que el trabajador no haya respondido la pregunta antes
      for (const r of respuestas) {
        await validarPreguntaNoRespondida(trabajador_idNumber, r.pregunta_id);
      }
      const respuestasGuardadas = await insertarRespuestas(trabajador_idNumber, respuestas); //Guardar las respuestas del trabajador

      await analizarResultadosPorTrabajador(trabajador_idNumber); //Generar analisis de las respuestas

      const urlPDF = `${req.protocol}://${req.get("host")}/api/resultado/${trabajador_idNumber}/pdf`;

      res.status(201).json({
        message: "Respuestas guardadas correctamente",
        pdf_resultado: urlPDF,
        respuestas: respuestasGuardadas,

      });
    } catch (error) {
      logger.error("Error en el controlador al guardar respuestas:", error);
      const mensaje = error.message || "Error al guardar respuestas";
      const status = mensaje.includes("ya has respondido") ? 409 : 500;
      res.status(status).json({ message: mensaje });
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
            organizacion: fila.organizacion,
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
  
      const usuariosConEstado = Array.from(agrupado.values()).map((trabajador: any) => ({
        trabajador_id: trabajador.trabajador_id,
        nombre: trabajador.nombre,
        puesto: trabajador.puesto,
        departamento: trabajador.departamento,
        organizacion: trabajador.organizacion,
        respondido: trabajador.cuestionarios.length > 0,
        respuestas: trabajador.cuestionarios,
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
  