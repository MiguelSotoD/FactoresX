export const userValidation = {
    id: {
        'number.base': '" ID" debe ser un numero',
        'number.empty': '"ID" no puede estar vacío',
    },
    email: {
        'string.base': '"email" debe ser una cadena de Texto',
        'string.max': '"email" no puede exceder los 250 caracteres',
        'string.email': '"email" debe ser un correo valido',
    },
    password: {
        'string.base': '"Password" debe ser mayor a 6 caracteres',
        'string.empty': '"Password" no puede estar vacío',
    },
  };