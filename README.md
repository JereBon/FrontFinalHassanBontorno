# Recirculate - E-commerce Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Interfaz moderna y responsiva para la plataforma de E-commerce Recirculate.**

[Características](#-características) •
[Instalación](#-instalación) •
[Estructura](#-estructura)

</div>

---

## 🎯 Descripción General

Este proyecto es el frontend de la aplicación "Recirculate", construido con **Next.js 14** (App Router). Ofrece una experiencia de usuario fluida, diseño responsivo y gestión de estado global para autenticación y carrito de compras.

Diseñado con un enfoque **"Mobile First"** y estética minimalista/premium (`soft-card`, `glassmorphism`), compatible con Modo Oscuro automático.

## ✨ Características

### 🛍️ Experiencia de Compra
- **Catálogo de Productos**: Listado con filtros por categoría y buscador en tiempo real.
- **Detalle de Producto**: Imágenes, descripción, stock en tiempo real y sistema de reseñas (1-5 estrellas).
- **Carrito de Compras**: Gestión de items, cálculo de totales persistente.
- **Checkout Seguro**: Flujo de compra en pasos (Dirección -> Factura -> Confirmación).

### 👤 Gestión de Usuario
- **Autenticación**: Login y Registro con validación de formularios.
- **Perfil de Usuario**:
    - **Mis Datos**: Edición de perfil.
    - **Mis Direcciones**: ABM de direcciones de envío.
    - **Mis Pedidos**: Historial de compras con estado y detalle de items.

### 🛡️ Panel de Administración
- Acceso restringido (solo admins).
- **Gestión de Productos**: Alta, baja y modificación de productos.
- **Gestión de Categorías**: Organización del catálogo.

### 🎨 UI/UX
- **Diseño Responsivo**: Adaptable a Móvil, Tablet y Desktop.
- **Modo Oscuro**: Soporte nativo para cambio de tema (Claro/Oscuro).
- **Feedback Visual**: Notificaciones (Toast), loaders y estados de error amigables.

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js v18+
- Docker (Opcional, para entorno completo)
- Backend corriendo en `http://localhost:8000`

### Opción 1: Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno (.env.local):**
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Acceder a `http://localhost:3000`

### Opción 2: Docker (Recomendado)

Si estás ejecutando todo el stack con Docker Compose desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto levantará tanto el Frontend (puerto 3000) como el Backend (puerto 8000).

---

## 📂 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Rutas protegidas de administración
│   ├── login/             # Página de inicio de sesión
│   ├── product/           # Detalle de productos
│   ├── profile/           # Panel de usuario (Pedidos, Direcciones)
│   ├── shop/              # Catálogo principal
│   └── layout.tsx         # Layout principal (Navbar, Footer, Providers)
│
├── components/             # Componentes Reutilizables
│   ├── Navbar.tsx         # Navegación y Buscador
│   ├── ProductCard.tsx    # Tarjeta de producto
│   ├── ReviewForm.tsx     # Modal de reseñas
│   └── ui/                # Componentes base (Botones, Inputs)
│
├── context/                # Estado Global
│   ├── AuthContext.tsx    # Manejo de sesión
│   ├── CartContext.tsx    # Lógica del carrito
│   └── ThemeContext.tsx   # Modo Oscuro/Claro
│
├── services/               # Comunicación con Backend (Axios)
│   ├── authService.ts
│   ├── orderService.ts
│   ├── productService.ts
│   └── ...
│
└── types/                  # Definiciones TypeScript (Interfaces)
```

## 🛠 Tecnologías

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 3
- **Estado**: React Context API
- **Cliente HTTP**: Axios
- **Iconos**: Heroicons / React Icons

---

## 🔒 Variables de Entorno

| Variable | Descripción | Valor Default |
|----------|-------------|---------------|
| `NEXT_PUBLIC_API_URL` | URL base del Backend API | `http://localhost:8000` |

---

Desarrollado para el proyecto final **Recirculate**.
