import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { userValidation } from "../validator/userValidator";
import { newUser, signUser } from "../controller/userController";

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
    signUser
  );


  
/**
 * @swagger
 * /user/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registrar datos de un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*                 description: Nombre del trabajador.
*                 example: "Juan"
*               apellido_paterno:
*                 type: string
*                 description: Apellido Paterno
*                 example: 'Contreras'
*               apellido_materno:
*                 type: string
*                 description: Apellido Materno
*                 example: 'Soto'
*               email:
*                 type: string
*                 description: Correo electronico para iniciar sesion
*                 example: 'asd@gmail.com'
*               password:
*                 type: string
*                 description: Contraseña para iniciar sesion
*                 example: '123232'
*               departamento:
*                 type: string
*                 description: Departamento en el que trabaja la persona
*                 example: 'Recursos Humanos'
*               puesto:
*                 type: string
*                 description: Puesto que tiene la persona
*                 example: 'Supervisor'
 *     responses:
 *       201:
 *         description: Registro exitoso de usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro Exitoso"
 *       400:
 *         description: Error de Servidor

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
    "/registrar",
    celebrate({
      [Segments.BODY]: Joi.object({
        nombre: Joi.string().min(3).max(250).required().messages(userValidation.nombre),
        apellido_paterno: Joi.string().min(3).max(250).required().messages(userValidation.apellido_paterno),
        apellido_materno: Joi.string().min(3).max(250).required().messages(userValidation.apellido_materno),
        email: Joi.string().min(3).max(250).email().messages(userValidation.email),
        password: Joi.string().required().messages(userValidation.password),
        departamento: Joi.string().min(3).max(250).required().messages(userValidation.departamento),
        puesto: Joi.string().min(3).max(250).required().messages(userValidation.puesto),
        rol: Joi.string().min(3).max(250).required().messages(userValidation.rol),
      }),
    }),
    newUser
  );


/**
 * @swagger
  * /user/logout:
  *   post:
  *     summary: Cerrar Sesion
  *     description: Cerrar sesion del usuario
  *     tags:
  *       - Usuarios
  *     requestBody:
  *       required: false
  *     responses:
  *       201:
  *         description: Cierre de sesion exitoso
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: "Cierre de sesion exitoso"
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
router.post("/logout",);

/**
 * @swagger
 * /user/usuarios:
 *   get:
 *     summary: Obtener datos de todos los usuarios
 *     description: Devuelve un json con los datos de todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Datos de los usuario obtenidos correctamente
 *       400:
 *        description: Error de Servidor
 */
router.get("/usuarios", );


/**
 * @swagger
 * /user/perfil:
 *   get:
 *     summary: Obtener datos de un usuario en especifico
 *     description: Devuelve un json con los datos del usuario en especifico.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos correctamente
 *       400:
 *        description: Error de Servidor
 */

router.get("/perfil/:id", );
 

export default router;

