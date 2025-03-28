export const cuestionarioValidator = {
    nombre:{
        'string.base': '"Nombre" debe ser una cadena de Texto',
        'string.min': '"Nombre" debe tener al menos 3 caracteres',
        'string.max': '"Nombre" no puede exceder los 250 caracteres',
    },
    descripcion: {
        'string.base': '"descripcion" debe ser una cadena de Texto',
        'string.min': '"descripcion" debe tener al menos 3 caracteres',
        'string.max': '"descripcion" no puede exceder los 250 caracteres',
    },
  };
  export const preguntasValidator = {
    texto: {
      "string.base": "El texto de la pregunta debe ser una cadena",
      "string.empty": "La pregunta no puede estar vacía",
      "string.min": "La pregunta debe tener al menos 3 caracteres",
      "any.required": "El texto de la pregunta es obligatorio",
    },
    tipo: {
      "string.base": "El tipo de pregunta debe ser texto",
      "any.only": "El tipo de pregunta debe ser 'abierta' o 'opcion'",
      "any.required": "El tipo de pregunta es obligatorio",
    },
  };
  
  export const respuestasValidator = {
    usuario_id: {
      "number.base": "El ID del usuario debe ser un número",
      "any.required": "El ID del usuario es obligatorio",
    },
    pregunta_id: {
      "number.base": "El ID de la pregunta debe ser un número",
      "any.required": "El ID de la pregunta es obligatorio",
    },
    respuesta: {
      "string.base": "La respuesta debe ser una cadena de texto",
      "string.empty": "La respuesta no puede estar vacía",
      "any.required": "La respuesta es obligatoria",
    },
  };