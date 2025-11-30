# URL Shortener

API para acortar URLs desarrollada con Node.js, Express y MySQL.

## 📋 Características

-   ✨ Acortamiento de URLs con alias personalizado
-   🔍 Recuperación de URLs originales
-   📊 Respuestas estandarizadas (success/error)
-   🗄️ Base de datos MySQL
-   🔐 Manejo de sesiones con express-session
-   📦 Compresión de respuestas
-   🛠️ Manejo de errores centralizado

## 🚀 Tecnologías

-   **Node.js** - Runtime de JavaScript
-   **Express 5** - Framework web
-   **MySQL2** - Cliente de base de datos
-   **dotenv** - Gestión de variables de entorno
-   **express-session** - Manejo de sesiones
-   **compression** - Compresión de respuestas HTTP

## 📁 Estructura del Proyecto

```
api/
├── src/
│   ├── controller/       # Controladores de la API
│   │   └── apiGeneral.controller.js
│   ├── router/          # Definición de rutas
│   │   └── apiGeneral.router.js
│   ├── utils/           # Utilidades y helpers
│   │   ├── responses.js # Respuestas estandarizadas
│   │   └── utils.js
│   ├── db/              # Configuración de base de datos
│   ├── middleware/      # Middlewares personalizados
│   ├── service/         # Lógica de negocio
│   ├── public/          # Archivos estáticos
│   └── server.js        # Punto de entrada
├── build.js             # Script de minificación
├── package.json
└── .env.example         # Ejemplo de variables de entorno
web/                     # Frontend (en desarrollo)
```

## ⚙️ Instalación

1. **Clonar el repositorio**

    ```bash
    git clone <repository-url>
    cd url-shortener
    ```

2. **Instalar dependencias**

    ```bash
    cd api
    npm install
    ```

3. **Configurar variables de entorno**

    ```bash
    cp .env.example .env
    ```

    Editar `.env` con tus credenciales:

    ```env
    PORT=3000
    SESSION_SECRET=tu_secreto_aqui
    DEBBUGING=1

    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=url_shortener
    DB_PORT=3306
    ```

4. **Configurar base de datos MySQL**

    - Crear la base de datos
    - Ejecutar las migraciones necesarias (pendiente de documentar)

## 🎯 Uso

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

### Minificar código

```bash
npm run minify
```

### Docker

```bash
npm run docker
```

## 📡 API Endpoints

### Raíz

```http
GET /
```

Respuesta:

```json
{
    "ok": true,
    "message": "Bienvenido a la API del acortador de URLs",
    "data": {
        "message": "API de acortador de URLs funcionando correctamente"
    }
}
```

### Acortar URL

```http
POST /api/shorted
Content-Type: application/json

{
  "url": "https://ejemplo.com/url-muy-larga",
  "alias": "mi-url" // opcional
}
```

### Obtener URL original

```http
GET /api/shorted/:id
```

## 📝 Respuestas de la API

### Respuesta de Éxito

```json
{
    "ok": true,
    "message": "Mensaje opcional",
    "data": {
        /* datos */
    }
}
```

### Respuesta de Error

```json
{
    "ok": false,
    "error": "Descripción del error",
    "meta": {
        /* información adicional opcional */
    }
}
```

## 🛠️ Utilidades

### Funciones de Respuesta

```javascript
import { successResponse, errorResponse } from "./utils/responses.js";

// Respuesta de éxito
successResponse(res, 200, { id: 1, url: "..." }, "URL creada");

// Respuesta de error
errorResponse(res, 404, "URL no encontrada", { codigo: "NOT_FOUND" });
```

### Clase de Error Personalizada

```javascript
import { AppError } from "./utils/responses.js";

throw new AppError("Error personalizado", 400, { campo: "url" });
```

## 🔧 Configuración

### Variables de Entorno

| Variable         | Descripción          | Valor por defecto |
| ---------------- | -------------------- | ----------------- |
| `PORT`           | Puerto del servidor  | `3000`            |
| `SESSION_SECRET` | Secret para sesiones | -                 |
| `DEBBUGING`      | Modo debug (0 o 1)   | `0`               |
| `DB_HOST`        | Host de MySQL        | `localhost`       |
| `DB_USER`        | Usuario de MySQL     | -                 |
| `DB_PASSWORD`    | Contraseña de MySQL  | -                 |
| `DB_NAME`        | Nombre de la BD      | -                 |
| `DB_PORT`        | Puerto de MySQL      | `3306`            |

## 📦 Scripts Disponibles

-   `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
-   `npm start` - Inicia el servidor en modo producción
-   `npm run minify` - Minifica el código para producción
-   `npm run docker` - Inicia el contenedor Docker

## 🚧 En Desarrollo

-   [ ] Implementación de servicios de base de datos
-   [ ] Middleware de validación
-   [ ] Frontend (carpeta `web/`)
-   [ ] Sistema de estadísticas
-   [ ] Autenticación de usuarios
-   [ ] Rate limiting
-   [ ] Caducidad de URLs

## 📄 Licencia

ISC

## 👤 Autor

Desarrollado como parte del portafolio personal.
