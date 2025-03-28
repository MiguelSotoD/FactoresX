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