# Job Simulator — REST API · Nivel 3 (Senior)

**Autor:** Derek Friedhelm Coronado Chilin
**Carnet:** 24732
**Nivel:** 3 — Senior (máximo 100/100)
**Recurso:** Players (Jugadores de Basquetbol)

---

## Descripción

API REST con operaciones CRUD completas sobre el recurso `players`, construida con Node.js y Express, persistencia en PostgreSQL y entorno completamente containerizado con Docker.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js 20 |
| Framework | Express |
| Base de datos | PostgreSQL 16 |
| Containerización | Docker + Docker Compose |

---

## Estructura del proyecto

```
backend/
├── src/
│   ├── index.js          # Punto de entrada — configura Express y monta rutas
│   ├── db.js             # Configuración del pool de conexiones a PostgreSQL
│   └── routes/
│       └── players.js    # Definición de todos los endpoints REST
├── init.sql              # Script DDL ejecutado automáticamente por Docker
├── Dockerfile            # Imagen de la aplicación
├── docker-compose.yml    # Orquestación de servicios (backend + db)
├── .env.example          # Variables de entorno documentadas (sin valores reales)
└── .gitignore            # Excluye node_modules, .env y archivos de SO
```

---

## Levantar el sistema

### Requisitos

- Docker Desktop instalado y corriendo

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/dcoronado91/job-simulator.git
cd job-simulator/backend

# 2. Crear el archivo de variables de entorno
cp .env.example .env
# Editar .env con los valores reales

# 3. Levantar el sistema completo
docker compose up --build
```

La API queda disponible en `http://localhost:8080`.
PostgreSQL se inicializa automáticamente con el esquema definido en `init.sql`.

---

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_HOST` | Hostname de PostgreSQL (en Docker: nombre del servicio) | `db` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_NAME` | Nombre de la base de datos | `basketball_db` |
| `DB_USER` | Usuario de la base de datos | `postgres` |
| `DB_PASSWORD` | Contraseña de la base de datos | `postgres123` |
| `APP_PORT` | Puerto en que escucha Node.js | `3000` |

---

## Estructura del recurso

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | integer | primary key, autoincrement |
| `campo1` | string | requerido |
| `campo2` | string | requerido |
| `campo3` | string | requerido |
| `campo4` | integer | requerido |
| `campo5` | float | requerido |
| `campo6` | boolean | requerido |

---

## Endpoints

### GET /players
Retorna todos los jugadores.

**Response 200:**
```json
[
  {
    "id": 1,
    "campo1": "LeBron James",
    "campo2": "Lakers",
    "campo3": "Forward",
    "campo4": 23,
    "campo5": 27.5,
    "campo6": true
  }
]
```

---

### GET /players/:id
Retorna un jugador por ID.

**Response 200:** objeto del jugador
**Response 404:** `{ "error": "Player not found" }`

---

### POST /players
Crea un nuevo jugador. Todos los campos son requeridos.

**Body:**
```json
{
  "campo1": "Stephen Curry",
  "campo2": "Warriors",
  "campo3": "Point Guard",
  "campo4": 30,
  "campo5": 29.4,
  "campo6": true
}
```

**Response 201:** objeto creado
**Response 400:** `{ "error": "All fields are required" }`

---

### PUT /players/:id
Actualización completa del jugador. Todos los campos son requeridos.

**Response 200:** objeto actualizado
**Response 404:** `{ "error": "Player not found" }`

---

### PATCH /players/:id
Actualización parcial. Solo se modifican los campos presentes en el body.

**Body (ejemplo — solo actualiza campo2 y campo5):**
```json
{
  "campo2": "Nuggets",
  "campo5": 31.2
}
```

**Response 200:** objeto actualizado
**Response 400:** `{ "error": "No valid fields provided" }`
**Response 404:** `{ "error": "Player not found" }`

---

### DELETE /players/:id
Elimina un jugador por ID.

**Response 200:** `{ "message": "Player deleted", "player": { ... } }`
**Response 404:** `{ "error": "Player not found" }`

---

## Códigos HTTP

| Código | Uso |
|--------|-----|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 400 | Validación fallida |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## Historial de commits

El desarrollo fue realizado de forma incremental:

1. `chore: initialize Node.js backend project structure`
2. `feat: add database connection and DDL schema`
3. `feat: add Express server entry point w/ CORS`
4. `feat: add GET and POST routes for players resource`
5. `feat: add PUT, PATCH and DELETE routes for players resource`
6. `feat: add Docker Compose configuration for backend and database`
7. `chore: add .gitignore for backend`
