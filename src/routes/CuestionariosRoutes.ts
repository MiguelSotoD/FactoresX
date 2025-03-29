import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { cuestionarioValidator } from "../validator/cuestionarioValidator";
import { nuevoCuestionario, cuestionarioConPreguntas, cuestionarioConPreguntasbyId } from "../controller/cuestionarioController";

const router = Router();

// ESQUEMA PARA LAS RUTAS DE Cuestionarios
// Se define el esquema de los Cuestionarios para la documentación de Swagger
/**
/**
 * @swagger
 * components:
 *   schemas:
 *     Cuestionarios:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *       properties:
 *         nombre:
 *           type: string
 *           description: nombre de usuario
 *         descripcion:
 *           type: string
 *           description: descripcion del usuario
 *       example:
 *         nombre: "Factores de Riesgo Psicosocial"
 *         descripcion: "Análisis de riesgos psicosociales en el entorno laboral"
 */

/**
 * @swagger
 * /cuestionario/nuevoCuestionario:
 *   post:
 *     summary: Crear un nuevo cuestionario
 *     description: Crear un nuevo cuestionario para la aplicacion
 *     tags:
 *       - Cuestionarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuestionarios'
 *     responses:
 *       201:
 *         description: Creacion de cuestionario exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cuestionario creado exitosamente"
 *       400:
 *         description: Error de Servidor
 *       401:
 *         description: Error de autenticacion
 *       404:
 *         description: Error de Servidor
 *       405:
 *         description: Metodo no permitido
 *       500:
 *         description: Error interno del servidor
 *       503:
 *         description: Servidor no disponible
 */
router.post(
    "/nuevoCuestionario",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().required().min(3).max(50).messages(cuestionarioValidator.nombre),
        descripcion: Joi.string().required().min(3).max(100).messages(cuestionarioValidator.descripcion),
      }),
    }),
    nuevoCuestionario
  );

  /**
 * @swagger
 * /cuestionario/con-preguntas:
 *   get:
 *     summary: Obtener todos los cuestionarios con sus preguntas
 *     description: Retorna una lista de cuestionarios junto con sus preguntas relacionadas, sin incluir respuestas.
 *     tags:
 *       - Cuestionarios
 *     responses:
 *       200:
 *         description: Cuestionarios obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cuestionarios obtenidos correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cuestionario_id:
 *                         type: integer
 *                         example: 1
 *                       cuestionario_nombre:
 *                         type: string
 *                         example: Evaluación de Estrés
 *                       descripcion:
 *                         type: string
 *                         example: Cuestionario para evaluar niveles de estrés
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       preguntas:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Pregunta'
 *       500:
 *         description: Error interno del servidor
 */

router.get("/con-preguntas", cuestionarioConPreguntas);


/**
 * @swagger
 * /cuestionario/con-preguntas/{id}:
 *   get:
 *     summary: Obtener un cuestionario por ID con sus preguntas
 *     description: Retorna un cuestionario específico junto con sus preguntas relacionadas, sin incluir respuestas.
 *     tags:
 *       - Cuestionarios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cuestionario a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cuestionario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cuestionario obtenido correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     cuestionario_id:
 *                       type: integer
 *                       example: 1
 *                     cuestionario_nombre:
 *                       type: string
 *                       example: Evaluación de Estrés
 *                     descripcion:
 *                       type: string
 *                       example: Cuestionario para evaluar niveles de estrés
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                     preguntas:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Pregunta'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Cuestionario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

 router.get("/con-preguntas/:id", cuestionarioConPreguntasbyId);

export default router;