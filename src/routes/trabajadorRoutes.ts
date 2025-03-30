import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { trabajadorValidator } from "../validator/trabajadorValidator";
import { registrarTrabajador } from "../controller/trabajadorController";

const router = Router();

// ESQUEMA PARA LAS RUTAS DE Trabajadores
// Se define el esquema de los Trabajadores para la documentación de Swagger
/**
/**
 * @swagger
 * components:
 *   schemas:
 *     Trabajadores:
 *       type: object
 *       required:
 *         - nombre
 *         - puesto
 *         - departamento
 *         - fecha_ingreso
 *         - sexo
 *         - organizacion
 *       properties:
 *         nombre:
 *           type: string
 *           description: nombre del trabajador
 *         puesto:
 *           type: string
 *           description: puesto que ocupa el trabajador en la organizacion
 *         departamento:
 *           type: string
 *           description: departamento al que pertenece el trabajador
 *         fecha_ingreso:
 *           type: Date
 *           description: fecha de ingreso del trabajador a la organizacion
 *         sexo:
 *           type: string
 *           description: sexo del trabajador
 *         organizacion:
 *           type: string
 *           description: Nombre de la organizacion a la que pertenece el trabajador
 *       example:
 *         nombre: "Juan Daniel Gomez"
 *         puesto: "Gerente"
 *         departamento: "Recursos Humanos"
 *         fecha_ingreso: "2023-01-01"
 *         sexo: "masculino"
 *         organizacion: "Google Cloud"
 */

/**
 * @swagger
 * /trabajador/nuevoTrabajador:
 *   post:
 *     summary: Registrar un nuevo trabajador
 *     description: Registrar un nuevo trabajador en la aplicacion 
 *     tags:
 *       - Trabajadores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trabajadores'
 *     responses:
 *       201:
 *         description: Registro de trabajador exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trabajador registrado exitosamente"
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
    "/nuevoTrabajador",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().min(3).max(50).messages(trabajadorValidator.nombre),
        puesto: Joi.string().required().min(1).max(100).messages(trabajadorValidator.descripcion),
        departamento: Joi.string().required().min(3).max(100).messages(trabajadorValidator.descripcion),
        fecha_ingreso: Joi.date().required().messages(trabajadorValidator.descripcion),
        sexo: Joi.string().required().min(1).max(10).valid("masculino", "femenino").messages(trabajadorValidator.descripcion),
        organizacion: Joi.string().required().min(3).max(100).messages(trabajadorValidator.descripcion),
      }),
    }),
    registrarTrabajador
  );

  
export default router;