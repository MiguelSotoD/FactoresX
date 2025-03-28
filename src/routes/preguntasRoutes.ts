 import { celebrate, Joi, Segments } from "celebrate";
 import { Router } from "express";
 import { preguntasValidator } from "../validator/cuestionarioValidator";
 import { agregarPreguntas } from "../controller/preguntasController";
 
 const router = Router();
  
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
              texto: Joi.string().min(3).required().messages(preguntasValidator.texto),
              tipo: Joi.string().valid("abierta", "opcion").required().messages(preguntasValidator.tipo),
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