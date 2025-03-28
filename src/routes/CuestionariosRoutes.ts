import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { cuestionarioValidator } from "../validator/cuestionarioValidator";
import { nuevoCuestionario } from "../controller/cuestionarioController";

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


export default router;