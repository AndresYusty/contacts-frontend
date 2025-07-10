# Gestión de Contactos - Frontend Angular

Una aplicación web moderna para gestionar contactos, desarrollada con Angular 17 y conectada a una API REST en PHP.

## 🚀 Características

- **Gestión completa de contactos**: Crear, editar, eliminar y visualizar contactos
- **Múltiples números de teléfono**: Soporte para agregar varios números por contacto
- **Validación de formularios**: Reactive Forms con validación en tiempo real
- **Búsqueda en tiempo real**: Filtrado instantáneo de contactos
- **Almacenamiento local**: Fallback a localStorage cuando la API no está disponible
- **Diseño responsive**: Interfaz adaptada para móviles y tablets
- **UI moderna**: Diseño con gradientes y efectos visuales atractivos

## 🛠️ Tecnologías Utilizadas

- **Angular 17**: Framework principal
- **TypeScript**: Lenguaje de programación
- **Reactive Forms**: Para validación de formularios
- **SCSS**: Estilos con preprocesador
- **RxJS**: Programación reactiva
- **HTTP Client**: Comunicación con API REST

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- Angular CLI (se instalará automáticamente)
- **Backend PHP ejecutándose en `http://localhost:8000`**
- **Base de datos MySQL configurada**

## 🔧 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd contacts-frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar la API**:
   - Asegúrate de que el backend PHP esté ejecutándose en `http://localhost:8000`
   - La URL de la API se configura automáticamente en `src/environments/environment.ts`

## 🚀 Ejecución

### Desarrollo
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`

### Producción
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── contact-list/          # Lista principal de contactos
│   │   ├── contact-form/          # Formulario de creación/edición
│   │   └── contact-card/          # Tarjeta individual de contacto
│   ├── models/
│   │   └── contact.model.ts       # Interfaces TypeScript
│   ├── services/
│   │   └── contact.service.ts     # Servicio para API y localStorage
│   ├── app.component.*            # Componente principal
│   └── app.module.ts              # Módulo principal
├── environments/
│   ├── environment.ts             # Configuración de desarrollo
│   ├── environment.development.ts # Configuración específica de desarrollo
│   └── environment.prod.ts        # Configuración de producción
└── styles.scss                    # Estilos globales
```

## 🔌 Integración con Backend

La aplicación se conecta automáticamente al backend PHP en:
- **URL base**: `http://localhost:8000/contacts`
- **Endpoints soportados**:
  - `GET /contacts` - Obtener todos los contactos
  - `POST /contacts` - Crear nuevo contacto
  - `PUT /contacts/{id}` - Actualizar contacto
  - `DELETE /contacts/{id}` - Eliminar contacto

### Configuración de Entornos

La aplicación utiliza diferentes configuraciones según el entorno:

- **Desarrollo**: `environment.development.ts` - Incluye logging y localStorage
- **Producción**: `environment.prod.ts` - Configuración optimizada
- **Por defecto**: `environment.ts` - Configuración base

### Fallback a localStorage

Si la API no está disponible, la aplicación:
1. Detecta automáticamente el error de conexión
2. Cambia a modo offline usando localStorage
3. Sincroniza los datos cuando la API vuelve a estar disponible

## 🎨 Características de la UI

### Componentes Reutilizables
- **ContactListComponent**: Maneja la lista principal y la búsqueda
- **ContactFormComponent**: Formulario con validación Reactiva
- **ContactCardComponent**: Tarjeta individual con acciones

### Validaciones
- **Campos requeridos**: Nombre, apellido, email
- **Validación de email**: Formato correcto
- **Longitud mínima**: 2 caracteres para nombres
- **Formato de teléfono**: Patrón internacional

### Estados de la Aplicación
- **Loading**: Spinner durante operaciones
- **Error**: Mensajes de error claros
- **Empty**: Estado cuando no hay contactos
- **Success**: Confirmaciones de operaciones

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Layout en grid con múltiples columnas
- **Tablet**: Adaptación de espaciado y tamaños
- **Mobile**: Layout de una columna con navegación táctil

## 🔧 Configuración

### Variables de Entorno
Puedes configurar la URL de la API modificando los archivos de entorno:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/contacts'
};
```



## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

## 📦 Scripts Disponibles

- `npm start` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run test` - Ejecutar tests
- `npm run lint` - Linting del código
