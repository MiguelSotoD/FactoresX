import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { userValidation } from "../validator/userValidator";

const router = Router();

// ESQUEMA PARA LAS RUTAS DE Usuarios
// Se define el esquema de las Usuarios para la documentación de Swagger
/**
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       required:
 *         - email
 *         - contraseña
 *       properties:
 *         email:
 *           type: string
 *           description: Email de usuario
 *         contraseña:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         email: "root@ejemplo.com"
 *         contraseña: "123456aBcd-"
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Inciar Sesion
 *     description: Iniciar sesion con usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuarios'
 *     responses:
 *       201:
 *         description: Incio de sesion exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incio de sesion exitoso"
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
    "/login",
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string().min(3).max(250).email().messages(userValidation.email),
        password: Joi.string().required().messages(userValidation.password),
      }),
    }),
  );

module.exports = router;

export default router;

