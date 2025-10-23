# next-auth

Este repositorio contiene una aplicación Next.js que sirve como base para proyectos que consultan y gestionan datos en una base de datos MySQL. Está organizada con la carpeta `app/` (App Router) y componentes reutilizables para UI, autenticación y formularios.

## Contenido principal

- `app/` — Rutas y páginas de la aplicación (incluye módulos de autenticación, páginas principales, formularios y utilidades de ejemplo).
- `components/` — Componentes UI reutilizables (inputs, layout, navegación, tarjetas, etc.).
- `lib/` — Lógica compartida: conexión a base de datos, consultas y utilidades.
- `hooks/`, `utils/`, `types/` — Hooks, utilidades y tipos TypeScript.

## Características

- Integración con MySQL (conexión y consultas desde `lib/database.ts`).
- Registro y login (formularios con validación usando Zod y `react-hook-form`).
- Componentes UI reutilizables y accesibles (Field, Input, Card, Sheet, etc.).
- Uso de Server Actions y App Router de Next.js para flujos modernos.

## Requisitos previos

- Node.js (v18+ recomendado)
- Un servidor MySQL accesible desde tu entorno de desarrollo
- pnpm / npm / yarn (puedes usar cualquiera)

## Variables de entorno

Configura un archivo `.env` en la raíz del proyecto con las variables necesarias para la conexión a MySQL. Ejemplo:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app

MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_PORT=
```

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Scripts útiles

- `npm run dev` — Ejecuta el servidor en modo desarrollo.
- `npm run build` — Construye la app para producción.
- `npm run start` — Inicia la app construida (production).

## Notas de arquitectura

- La carpeta `app/(auth)/` contiene las páginas y componentes para `login` y `registro`. El formulario de registro usa `react-hook-form` + `zod` para validación.
- Revisa `lib/database.ts` para ver cómo se inicializa la conexión a MySQL.
- Si usas migraciones, agrégalas o ejecuta los SQL necesarios en tu base de datos antes de iniciar la app.

## Consejos y depuración

- Warnings sobre inputs controlados/no controlados: asegúrate de que `useForm` reciba `defaultValues` sincrónicos o que cada `Controller` tenga `defaultValue`.
- Si la app necesita datos iniciales del servidor, carga esos datos desde Server Components o espera hasta que las variables de entorno estén presentes.

## Contribuciones

- Si quieres aportar mejoras, abre un PR con una descripción clara y, si es relevante, agrega pruebas.

## Licencia

- Revisa el archivo `LICENSE` en la raíz del repositorio.

---

Si quieres que añada instrucciones más concretas (Docker, migraciones SQL, o scripts de ejemplo), dime qué prefieres y lo actualizo.
