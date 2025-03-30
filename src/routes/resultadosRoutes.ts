import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { descargarResultadoPDF } from "../controller/resultadosController"; // Asegúrate de que el path y nombre del archivo sea correcto

const router = Router();

/**
 * @swagger
 * /resultado/{id}/pdf:
 *   get:
 *     summary: Generar y descargar el PDF del resultado psicosocial de un trabajador
 *     description: Genera un reporte en PDF con los resultados psicosociales globales y por sección, basado en las respuestas del trabajador.
 *     tags:
 *       - Resultados
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del trabajador para generar el reporte
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: ID inválido
 *       404:
 *         description: No se encontró el resultado del trabajador
 *       500:
 *         description: Error al generar el PDF
 */

router.get(
  "/resultado/:id/pdf",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().integer().required().messages({
        "any.required": "El ID es obligatorio",
        "number.base": "El ID debe ser un número válido",
      }),
    }),
  }),
  descargarResultadoPDF
);

export default router;
