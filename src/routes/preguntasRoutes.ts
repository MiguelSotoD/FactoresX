 import { celebrate, Joi, Segments } from "celebrate";
 import { Router } from "express";
 import { preguntasValidator } from "../validator/cuestionarioValidator";
 import { agregarPreguntas } from "../controller/preguntasController";
 
 const router = Router();
  

 /**
 * @swagger
 * components:
 *   schemas:
 *     Pregunta:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         cuestionario_id:
 *           type: integer
 *         pregunta:
 *           type: string
 *         tipo_respuesta:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     Respuesta:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         pregunta_id:
 *           type: integer
 *         respuesta:
 *           type: string
 *         fecha_respuesta:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /preguntas/nuevasPreguntas:
 *   post:
 *     summary: Agregar preguntas a un cuestionario
 *     description: Crea múltiples preguntas asociadas a un cuestionario existente
 *     tags:
 *       - Preguntas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cuestionario_id
 *               - preguntas
 *             properties:
 *               cuestionario_id:
 *                 type: integer
 *                 example: 4
 *               preguntas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - pregunta
 *                     - tipo_respuesta
 *                   properties:
 *                     pregunta:
 *                       type: string
 *                       example: ¿Cómo te sientes actualmente con tu carga laboral?
 *                     tipo_respuesta:
 *                       type: string
 *                       enum: [opcion]
 *                       example: opcion
 *     responses:
 *       201:
 *         description: Preguntas agregadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Preguntas agregadas correctamente
 *                 preguntas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pregunta'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Cuestionario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
  router.post(
    "/nuevasPreguntas",
    celebrate({
      [Segments.BODY]: Joi.object({
        cuestionario_id: Joi.number().integer().required().messages({
          "number.base": "El ID del cuestionario debe ser un número",
          "any.required": "El ID del cuestionario es obligatorio"
        }),
        preguntas: Joi.array()
          .items(
            Joi.object({
              pregunta: Joi.string().min(3).required().messages(preguntasValidator.texto),
              tipo_respuesta: Joi.string().valid("opcion").required().messages(preguntasValidator.tipo),
            })
          )
          .min(1)
          .required()
          .messages({
            "array.base": "Las preguntas deben estar en una lista",
            "array.min": "Debes agregar al menos una pregunta",
            "any.required": "El campo preguntas es obligatorio"
          }),
      }),
    }),
    agregarPreguntas
  );


  export default router;