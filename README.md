# FactoresX - Evaluación de Riesgo Psicosocial

Esta aplicación web interactiva permite aplicar cuestionarios sobre factores de riesgo psicosocial (según la NOM-035) a los trabajadores de una organización utilizando la API de Google Forms. La aplicación recoge respuestas, calcula los resultados y proporciona un análisis inicial sobre el riesgo psicosocial y los posibles acontecimientos traumáticos severos.

## Características

- Aplicación de cuestionarios basados en la NOM-035.
- Integración con la API de Google Forms para la recopilación de respuestas.
- Análisis automatizado de los resultados.
- Interfaz de usuario intuitiva y responsiva.

## Requisitos Previos

1. Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).
2. Tener configurada una cuenta en [Google Cloud Platform](https://console.cloud.google.com/).
3. Habilitar la API de Google Forms y obtener las credenciales necesarias.

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/FactoresX.git
   cd FactoresX
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Configura las credenciales de la API de Google Forms:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade las siguientes variables de entorno:
     ```
     GOOGLE_FORMS_API_KEY=tu_api_key
     GOOGLE_FORMS_CLIENT_ID=tu_client_id
     ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- `npm run dev`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para encontrar y arreglar problemas.
- `npm run preview`: Previsualiza la aplicación construida.

## Uso

1. Inicia la aplicación en modo de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador y navega a `http://localhost:3000`.

3. Sigue las instrucciones en pantalla para aplicar los cuestionarios y analizar los resultados.

## Contribución

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una rama para tu nueva funcionalidad o corrección de errores:
   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía tus cambios al repositorio remoto:
   ```bash
   git push origin mi-nueva-funcionalidad
   ```
5. Abre un Pull Request en GitHub.

## Licencia

Este proyecto está licenciado bajo la [MIT License](https://opensource.org/licenses/MIT).
