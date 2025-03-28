
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import {  respuestasValidator } from "../validator/cuestionarioValidator";
import { guardarRespuestas } from "../controller/cuestionarioController";

const router = Router();


router.post(
    "/nuevasRespuestas",
    celebrate({
      [Segments.BODY]: Joi.object({
        usuario_id: Joi.number().required().messages(respuestasValidator.usuario_id),
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
  

export default router;