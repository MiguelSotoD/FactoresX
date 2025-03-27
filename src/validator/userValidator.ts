export const userValidation = {
    id: {
        'number.base': '" ID" debe ser un numero',
        'number.empty': '"ID" no puede estar vacío',
    },
    nombre:{
        'string.base': '"Nombre" debe ser una cadena de Texto',
        'string.min': '"Nombre" debe tener al menos 3 caracteres',
        'string.max': '"Nombre" no puede exceder los 250 caracteres',
    },
    apellido_paterno:{
        'string.base': '"Apellido Paterno" debe ser una cadena de Texto',
        'string.min': '"Apellido Paterno" debe tener al menos 3 caracteres',
        'string.max': '"Apellido Paterno" no puede exceder los 250 caracteres',
    },
    apellido_materno:{
        'string.base': '"Apellido Materno" debe ser una cadena de Texto',
        'string.min': '"Apellido Materno" debe tener al menos 3 caracteres',
        'string.max': '"Apellido Materno" no puede exceder los 250 caracteres',
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
    departamento: {
        'string.base': '"Departamento" debe ser una cadena de Texto',
        'string.min': '"Departamento" debe tener al menos 3 caracteres',
        'string.max': '"Departamento" no puede exceder los 250 caracteres',
    },
    puesto: {
        'string.base': '"Puesto" debe ser una cadena de Texto',
        'string.min': '"Puesto" debe tener al menos 3 caracteres',
        'string.max': '"Puesto" no puede exceder los 250 caracteres',
    },
  };