# 🏗️ API - Tienda de Deporte

**Versión:** 1.0  
**Base URL:** `http://localhost:4000/api`

> En producción, reemplaza `http://localhost:4000` por tu dominio real.

---

## ⚙️ Arquitectura del Proyecto

Este backend está desarrollado con **Node.js**, **Express** y **TypeScript**, siguiendo una **arquitectura monolítica modular**.

### 🧩 ¿Qué significa “monolito modular”?

Un **monolito modular** mantiene todo el backend dentro de una misma aplicación (un solo servidor y proceso),  
pero **divide el código en módulos funcionales** —por ejemplo, `users`, `shop`, etc.— para mantener una estructura clara, mantenible y escalable.

Cada módulo se encarga de una parte del negocio e incluye sus propios controladores, servicios, DTOs y repositorios,  
permitiendo desarrollar nuevas funcionalidades sin romper el resto del sistema.

---

## 📁 Estructura del Proyecto

```bash
├── 📁 src
│   ├── 📁 common
│   │   ├── 📁 middlewares
│   │   │   └── 📄 auth.middleware.ts
│   │   └── 📁 models
│   │       ├── 📄 shop.model.ts
│   │       └── 📄 user.models.ts
│   │
│   ├── 📁 core
│   │   ├── 📁 config
│   │   │   └── 📄 index.ts
│   │   └── 📁 database
│   │       └── 📄 database.ts
│   │
│   ├── 📁 modules
│   │   ├── 📁 shop
│   │   │   ├── 📁 dto
│   │   │   │   └── 📄 shop.dto.ts
│   │   │   ├── 📁 repositories
│   │   │   │   └── 📄 shop.repositories.ts
│   │   │   ├── 📄 shop.controller.ts
│   │   │   ├── 📄 shop.routes.ts
│   │   │   └── 📄 shop.service.ts
│   │   │
│   │   └── 📁 user
│   │       ├── 📁 dto
│   │       │   └── 📄 user.dto.ts
│   │       ├── 📁 repositories
│   │       │   └── 📄 user.repositories.ts
│   │       ├── 📄 user.controller.ts
│   │       ├── 📄 user.routes.ts
│   │       └── 📄 user.service.ts
│   │
│   ├── 📄 app.ts
│   └── 📄 server.ts
│
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
├── ⚙️ pnpm-workspace.yaml
└── ⚙️ tsconfig.json
```

---

## 🧠 Explicación de Carpetas

### `src/common/`

Código **compartido entre módulos**:

- **`middlewares/`** → Middlewares reutilizables. Ejemplo:

  - `auth.middleware.ts`: Verifica el JWT antes de permitir el acceso a rutas protegidas.

- **`models/`** → Modelos de base de datos (Schemas de Mongoose).

---

### `src/core/`

Contiene la configuración **central del sistema**:

- **`config/`** → Variables de entorno y configuraciones globales.
- **`database/`** → Conexión y configuración de MongoDB.

---

### `src/modules/`

Cada módulo representa una parte funcional de la aplicación:

- **`user/`** → Maneja todo lo relacionado con usuarios: registro, login, perfil, etc.
- **`shop/`** → Contiene la lógica de compras, productos, y operaciones de tienda.

Cada módulo contiene:

- **`dto/`** → Validación de datos de entrada.
- **`repositories/`** → Acceso a la base de datos.
- **`controller.ts`** → Define las rutas y controla las peticiones.
- **`service.ts`** → Lógica de negocio pura.
- **`routes.ts`** → Conecta controladores con Express Router.

---

## 🚀 Ejecución

Para iniciar el servidor:

```bash
pnpm run dev
```

El servidor corre por defecto en:

```
http://localhost:4000
```

---

## 🔐 Autenticación

Algunas rutas requieren autenticación mediante **JWT (JSON Web Token)**.

- **Cabecera requerida**:

  ```
  Authorization: Bearer <tu_token_jwt>
  ```

- El token se obtiene al iniciar sesión con `/users/login`.

---

## 🧑‍🚀 Usuarios (`/users`)

### `POST /users/register`

**Registrar un nuevo usuario**

**Solicitud (JSON)**

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta (201)**

```json
{
  "message": "Usuario registrado correctamente"
}
```

**Errores comunes**

- `400`: Email ya registrado

---

### `POST /users/login`

**Iniciar sesión**

**Solicitud (JSON)**

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta (200)**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx",
  "message": "Sesión iniciada correctamente"
}
```

**Errores comunes**

- `401`: Credenciales inválidas

---

### `GET /users/profile`

**Obtener el perfil del usuario autenticado**

**Protegida** ✅
Requiere token JWT en los headers.

**Ejemplo de solicitud**

```
GET /api/users/profile
Authorization: Bearer <tu_token_jwt>
```

**Respuesta (200)**

```json
{
  "_id": "690b48ded4e76720044e8231",
  "name": "Maria Lopez",
  "email": "maria@gmail.com",
  "password": "$2b$10$G6ecN1ffNXHN99LvjbkhSuExAi/ZVEKnhYCg9mQhNNDA.pfYOGVVm",
  "products": [
    {
      "productId": {
        "_id": "690b5c79d8e6625b2033c734",
        "name": "Zapatillas Deportivas",
        "description": "Zapatillas para running",
        "price": 15000,
        "image": "https://ejemplo.com/zapatillas.jpg",
        "createdAt": "2025-11-05T14:17:29.601Z",
        "__v": 0
      },
      "_id": "690b5c79d8e6625b2033c736"
    }
  ],
  "createdAt": "2025-11-05T12:53:50.296Z",
  "__v": 0
}
```

**Errores comunes**

- `401`: Token no proporcionado o inválido

---

## 🛍️ Tienda (`/shop`) — _Rutas protegidas_

### `POST /shop/buy/:id`

**Comprar un producto existente**

- **Parámetro de URL:**
  `id` → ID del producto (ObjectId de MongoDB)

**Ejemplo de solicitud**

```
POST /api/shop/buy/690b48ded4e76720044e8231
Authorization: Bearer <tu_token_jwt>
```

```json
{
  "name": "Zapatillas Deportivas",
  "description": "Zapatillas para running",
  "price": 15000,
  "image": "https://ejemplo.com/zapatillas.jpg"
}
```

**Respuesta (201)**

```json
{
  "message": "Producto comprado exitosamente"
}
```

**Errores comunes**

- `401`: Token no proporcionado o inválido
- `400`: Producto no encontrado o usuario inexistente

---

## 📌 Códigos de Estado HTTP

| Código | Significado                |
| ------ | -------------------------- |
| `200`  | OK (respuesta exitosa)     |
| `201`  | Creado (recurso creado)    |
| `400`  | Solicitud inválida         |
| `401`  | No autorizado              |
| `404`  | No encontrado              |
| `500`  | Error interno del servidor |

---
