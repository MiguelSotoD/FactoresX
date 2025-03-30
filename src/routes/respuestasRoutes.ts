
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import {  respuestasValidator } from "../validator/cuestionarioValidator";
import { guardarRespuestas, verRespuestaUsuarios } from "../controller/respuestasController";

const router = Router();

/**
 * @swagger
 * /respuestas/nuevasRespuestas:
 *   post:
 *     summary: Guardar respuestas de usuario
 *     description: Registra las respuestas dadas por un usuario a preguntas específicas
 *     tags:
 *       - Respuestas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - respuestas
 *             properties:
 *               trabajador_id:
 *                 type: integer
 *                 example: 5
 *               respuestas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - pregunta_id
 *                     - respuesta
 *                   properties:
 *                     pregunta_id:
 *                       type: integer
 *                       example: 12
 *                     respuesta:
 *                       type: string
 *                       example: "2"
 *     responses:
 *       201:
 *         description: Respuestas guardadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Respuestas guardadas correctamente
 *                 respuestas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Respuesta'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.post(
    "/nuevasRespuestas",
    celebrate({
      [Segments.BODY]: Joi.object({
        trabajador_id: Joi.number().required().messages(respuestasValidator.usuario_id),
        respuestas: Joi.array()
          .items(
            Joi.object({
              pregunta_id: Joi.number().required().messages(respuestasValidator.pregunta_id),
              respuesta: Joi.string().required().messages(respuestasValidator.respuesta),
            })
          )
          .min(1)
          .required()
          .messages({
            "array.base": "Las respuestas deben estar en una lista",
            "array.min": "Debes agregar al menos una respuesta",
            "any.required": "El campo respuestas es obligatorio"
          }),
      }),
    }),
    guardarRespuestas
  );


  /**
   * @swagger
   * /respuestas/obtenerRespuestas:
   *   get:
   *     summary: Obtener respuestas de usuario
   *     description: Recupera las respuestas dadas por un usuario a preguntas específicas
   *     tags:
   *       - Respuestas
   *     parameters:
   *       - in: query
   *         name: trabajador_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del usuario cuyas respuestas se desean obtener
   *     responses:
   *       200:
   *         description: Respuestas obtenidas correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 usuario_id:
   *                   type: integer
   *                   example: 5
   *                 respuestas:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Respuesta'
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Respuestas no encontradas
   *       500:
   *         description: Error interno del servidor
   */

  router.get(
    "/obtenerRespuestas",
    celebrate({
      [Segments.BODY]: Joi.object({
        usuario_id: Joi.number().required().messages({
          "any.required": "El campo usuario_id es obligatorio",
          "number.base": "El usuario_id debe ser un número",
        }),
      }),
    }),
    verRespuestaUsuarios
  );

export default router;