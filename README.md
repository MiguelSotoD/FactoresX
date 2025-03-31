# FactoresXBack

Este proyecto es una API para la gestión de cuestionarios y análisis psicosociales. Incluye funcionalidades como autenticación de usuarios, registro de trabajadores, creación de cuestionarios, análisis de respuestas y generación de reportes en PDF.

## Requisitos previos

1. **Node.js**: Asegúrate de tener instalado Node.js (versión 16 o superior).
2. **PostgreSQL**: Configura una base de datos PostgreSQL.
3. **Git**: Para clonar el repositorio.
4. **NPM**: Instalado junto con Node.js.

## Configuración del proyecto

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd FactoresXBack
```

### 2. Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y proporciona los valores necesarios:

```properties
PORT=4000
USERPG=postgres
PASSWORDPG=postgres
HOSTPG=localhost
PORTPG=5432
DATABASEPG=nombre_de_tu_base_de_datos
JWT_SECRET=clave_secreta
JWT_EXPIRES_IN=1h
```

### 4. Configurar la base de datos

1. Crea una base de datos en PostgreSQL con el nombre especificado en el archivo `.env`.
2. Ejecuta las migraciones y scripts necesarios para crear las tablas requeridas.

### 5. Ejecutar el servidor

Para iniciar el servidor en modo desarrollo, utiliza:

```bash
npm run dev
```

Para iniciar el servidor en modo producción, utiliza:

```bash
npm start
```

### 6. Verificar la conexión

Abre tu navegador y accede a `http://localhost:4000`. Deberías ver un mensaje indicando que el servidor está funcionando.

## Documentación de la API

La documentación de la API está disponible en Swagger. Una vez que el servidor esté en ejecución, accede a:

```
http://localhost:4000/api-docs
```

## Scripts disponibles

- `npm run dev`: Ejecuta el servidor en modo desarrollo con `nodemon`.
- `npm start`: Ejecuta el servidor en modo producción.
- `npm run build`: Compila el proyecto TypeScript a JavaScript.

## Estructura del proyecto

- **src/config**: Configuración del entorno y base de datos.
- **src/controller**: Controladores para manejar las solicitudes HTTP.
- **src/middleware**: Middlewares para validación y autenticación.
- **src/models**: Interfaces y modelos de datos.
- **src/routes**: Definición de rutas de la API.
- **src/services**: Lógica de negocio y conexión con la base de datos.
- **src/utils**: Utilidades como logger y configuración de Swagger.
- **src/validator**: Validaciones de datos de entrada.

## Endpoints principales

### Usuarios
- **POST** `/api/user/login`: Iniciar sesión.
- **POST** `/api/user/registrar`: Registrar un nuevo usuario.
- **GET** `/api/user/usuarios`: Obtener todos los usuarios.

### Cuestionarios
- **POST** `/api/cuestionario/nuevoCuestionario`: Crear un nuevo cuestionario.
- **GET** `/api/cuestionario/con-preguntas`: Obtener cuestionarios con preguntas.

### Respuestas
- **POST** `/api/respuestas/nuevasRespuestas`: Guardar respuestas de un trabajador.
- **GET** `/api/respuestas/obtenerRespuestas`: Obtener respuestas de trabajadores.

### Resultados
- **GET** `/api/resultado/:id/pdf`: Descargar el PDF de resultados de un trabajador.

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue los pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m "Descripción de los cambios"`).
4. Haz un push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.