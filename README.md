# Sistema Integral de Gestión Académica EEJ

Sistema de gestión académica para la Escuela de Estudios Judiciales del Organismo Judicial de Guatemala.

## Descripción

Este sistema permite la gestión integral de actividades académicas, incluyendo:

- Planificación y seguimiento de actividades formativas
- Gestión de sesiones múltiples con diferentes modalidades
- Flujos de aprobación configurables
- Seguimiento de participantes y asistencia
- Generación de informes estandarizados (FO-EEJ-16 y FO-EEJ-17)
- Visualizaciones interactivas (Dashboard, Calendario, Kanban)

## Arquitectura

El sistema está construido con una arquitectura moderna de microservicios:

### Backend

- **Framework**: NestJS con TypeScript
- **Base de datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT con Passport
- **Documentación API**: Swagger
- **Validación**: class-validator
- **Reportes**: PDFKit, ExcelJS

### Frontend

- **Framework**: React con TypeScript
- **Estado**: Redux Toolkit
- **Estilos**: TailwindCSS
- **Formularios**: React Hook Form
- **Gráficos**: Recharts
- **Tablas**: React Table
- **Kanban**: React Beautiful DnD

## Estructura del Proyecto

```
/
├── src/                  # Backend (NestJS)
│   ├── activities/       # Módulo de actividades
│   ├── areas/            # Módulo de áreas
│   ├── audit/            # Módulo de auditoría
│   ├── auth/             # Módulo de autenticación
│   ├── common/           # Código compartido
│   ├── documents/        # Módulo de documentos
│   ├── notifications/    # Módulo de notificaciones
│   ├── participants/     # Módulo de participantes
│   ├── reports/          # Módulo de informes
│   ├── roles/            # Módulo de roles
│   ├── sessions/         # Módulo de sesiones
│   ├── users/            # Módulo de usuarios
│   ├── workflow/         # Módulo de flujos de trabajo
│   ├── app.module.ts     # Módulo principal
│   └── main.ts           # Punto de entrada
│
├── client/               # Frontend (React)
│   ├── public/           # Archivos estáticos
│   └── src/              # Código fuente React
│       ├── app/          # Configuración de la aplicación
│       ├── components/   # Componentes reutilizables
│       ├── features/     # Características por dominio
│       ├── layouts/      # Layouts de la aplicación
│       ├── pages/        # Páginas de la aplicación
│       ├── services/     # Servicios API
│       ├── utils/        # Utilidades
│       ├── App.tsx       # Componente principal
│       └── index.tsx     # Punto de entrada
│
├── .env.development      # Variables de entorno para desarrollo
├── package.json          # Dependencias del backend
└── README.md             # Este archivo
```

## Requisitos

- Node.js 16+
- PostgreSQL 14+
- Redis (opcional, para caché)

## Instalación

### Backend

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.development
# Editar .env.development con tus configuraciones

# Iniciar en modo desarrollo
npm run start:dev
```

### Frontend

```bash
# Navegar al directorio del cliente
cd client

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

## Documentación API

Una vez iniciado el servidor, la documentación de la API estará disponible en:

```
http://localhost:3000/api/docs
```

## Modelo de Datos

El sistema utiliza un modelo de datos relacional con las siguientes entidades principales:

- **Usuarios**: Gestión de usuarios con roles y permisos
- **Actividades**: Actividades académicas con múltiples sesiones
- **Sesiones**: Instancias individuales de actividades
- **Participantes**: Personas que asisten a las actividades
- **Asistencia**: Registro de asistencia por sesión
- **Áreas**: Departamentos o unidades organizacionales
- **Flujos de Trabajo**: Procesos de aprobación configurables
- **Documentos**: Archivos adjuntos a actividades
- **Auditoría**: Registro completo de cambios en el sistema

## Licencia

Este proyecto es privado y de uso exclusivo para la Escuela de Estudios Judiciales del Organismo Judicial de Guatemala.